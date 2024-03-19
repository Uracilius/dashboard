const fs = require('fs');
const csvParser = require('csv-parser');
const CodeLineDTO = require("../dto/CodeLine");

const reportPath = 'src/resources/report.csv';

async function getCodeAlertsByFilePath(req, res) {
  let results = [];
  const page = parseInt(req.body.page, 10) || 1;
  const pageSize = parseInt(req.body.pageSize, 10) || 10;
  try {
    fs.createReadStream(reportPath)
      .pipe(csvParser())
      .on('data', (row) => {
        if (row.FilePath == req.body.filePath) {
          const dto = {
            ...CodeLineDTO,
            id: row.ID,
            filePath: row.FilePath,
            status: row.Status,
            meta: row.Meta
          };
          results.push(dto);
        }
      })
      .on('end', () => {
        const startIndex = (page - 1) * pageSize;
        const paginatedResults = results.slice(startIndex, startIndex + pageSize);
        res.json({
          page,
          pageSize,
          totalCount: results.length,
          data: paginatedResults,
        });
      });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Error reading file');
  }
}

async function getCode(req, res) {
    const requestedFilePath = req.body.id;

    let found = false;

    const stream = fs.createReadStream(reportPath).pipe(csvParser());

    stream.on('data', (row) => {
        if (row.ID === requestedFilePath) {
            found = true;
            res.json({ text: row.Code });
            stream.destroy();
        }
    })
    .on('end', () => {
        if (!found) {
            res.status(404).json({ error: 'No matching file path found in the CSV.' });
        }
    })
    .on('error', (error) => {
        console.error('Error reading file:', error);
        res.status(500).json({ error: 'Error reading file' });
    });
}

async function getFileList(req, res){
  try {
    const resultsSet = new Set();

    const page = parseInt(req.body.page, 10) || 1;
    const pageSize = parseInt(req.body.pageSize, 10) || 10;

    fs.createReadStream(reportPath)
      .pipe(csvParser())
      .on('data', (row) => {
        resultsSet.add(row.FilePath); 
      })
      .on('end', () => {
        const uniqueResults = [...resultsSet]; 

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedResults = uniqueResults.slice(startIndex, endIndex);

        res.json({
          currentPage: page,
          pageSize: pageSize,
          totalCount: uniqueResults.length,
          totalPages: Math.ceil(uniqueResults.length / pageSize),
          data: paginatedResults,
        });
      });
  }
  catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Error reading file');
  }
}

async function getAlertStatistics(req, res) {
  const commentCounts = {};

  fs.createReadStream(reportPath)
    .pipe(csvParser())
    .on('data', (row) => {
      const status = row.Status;
      if (!commentCounts[status]) {
        commentCounts[status] = { count: 0, files: new Set() };
      }
      commentCounts[status].count += 1;
      commentCounts[status].files.add(row.FilePath);
    })
    .on('end', () => {
      const statusStatisticsList = Object.entries(commentCounts).map(([status, { count }]) => ({
        status: status,
        numOfAlerts: count,
      }));

      const totalUniqueFiles = new Set();
      Object.values(commentCounts).forEach(({ files }) => {
        files.forEach(file => totalUniqueFiles.add(file));
      });

      const alertStatistics = {
        statusStatisticsList: statusStatisticsList,
        numOfFiles: totalUniqueFiles.size,
      };

      res.json(alertStatistics);
    })
    .on('error', (error) => {
      console.error('Error processing file:', error);
      res.status(500).json({ error: 'Error processing file' });
    });
}

module.exports = { getCodeAlertsByFilePath, getFileList, getCode, getAlertStatistics };
