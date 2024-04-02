const CodeLineDTO = require("../dto/CodeLine");
const CSVReader = require('../services/csvReader');
const { default: Constants } = require('../../environment');
const { setCache, getCache } = require('../cache/cacheUtil');
const Fuse = require('fuse.js');

async function getCodeAlertsByFilePath(req, res, next) {
  const page = parseInt(req.body.page, 10) || Constants.DEFAULT_PAGE;
  const pageSize = parseInt(req.body.pageSize, 10) || Constants.DEFAULT_PAGE_SIZE;
  const filePath = req.body.filePath;
  const cacheKey = `alerts:${filePath}:${page}:${pageSize}`;

  try {
    let paginatedResults = await getCache(cacheKey);
    if (!paginatedResults) {
      const filteredResults = await CSVReader.filterByFilePath(filePath);
      const results = filteredResults.map(row => ({
        ...CodeLineDTO,
        id: row.ID,
        filePath: row.FilePath,
        status: row.Status,
        meta: row.Meta
      }));

      const startIndex = (page - 1) * pageSize;
      paginatedResults = results.slice(startIndex, startIndex + pageSize);

      await setCache(cacheKey, paginatedResults);
    }

    res.json({
      page,
      pageSize,
      data: paginatedResults,
    });
  } catch (error) {
    next(error);
  }
}


async function getCode(req, res, next) {
  const requestedFilePath = req.body.id;
  const cacheKey = `code:${requestedFilePath}`;

  try {
    let row = await getCache(cacheKey);
    if (!row) {
      row = await CSVReader.findByID(requestedFilePath);
      if (row) {
        await setCache(cacheKey, row);
        res.json({ text: row.Code });
      } else {
        res.status(404).json({ error: 'No matching file path found in the CSV.' });
      }
    } else {
      res.json({ text: row.Code });
    }
  } catch (error) {
    next(error);
  }
}

async function getFileListWithFilter(req, res, next) {
  const page = parseInt(req.body.page, 10) || Constants.DEFAULT_PAGE;
  const fileNameFilter = req.body.fileNameFilter || '';
  const pageSize = parseInt(req.body.pageSize, 10) || Constants.DEFAULT_PAGE_SIZE;
  const cacheKey = `fileList:${page}:${fileNameFilter}:${pageSize}`;
  try {
    let paginatedFilePaths = await getCache(cacheKey);
    if (!paginatedFilePaths) {
      let uniqueFilePaths = await CSVReader.getUniqueFilePaths();

      let filteredFilePaths = uniqueFilePaths;
      if (fileNameFilter) {
        const fuse = new Fuse(uniqueFilePaths, { keys: ['filePath'] });
        const searchResults = fuse.search(fileNameFilter);
        filteredFilePaths = searchResults.map(result => result.item);
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      paginatedFilePaths = filteredFilePaths.slice(startIndex, endIndex);

      await setCache(cacheKey, paginatedFilePaths);
    }

    res.json({
      currentPage: page,
      pageSize: pageSize,
      data: paginatedFilePaths,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
}

async function getAlertStatistics(req, res, next) {
  const cacheKey = 'alertStatistics';

  try {
    let alertStatistics = await getCache(cacheKey);
    if (!alertStatistics) {
      alertStatistics = await CSVReader.getAlertStatistics();
      await setCache(cacheKey, alertStatistics);
    }

    res.json(alertStatistics);
  } catch (error) {
    next(error);
  }
}


module.exports = { getCodeAlertsByFilePath, getCode, getAlertStatistics, getFileListWithFilter};
