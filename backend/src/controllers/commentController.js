const fs = require('fs');
const csvParser = require('csv-parser');
const CodeLineDTO = require("../dto/CodeLine");

async function getCodeCommentsByFilePath(req, res) {
  let results = []; 
  const filePath = 'src/resources/report.csv'; 
  
  const page = parseInt(req.body.page, 10) || 1;
  const pageSize = parseInt(req.body.pageSize, 10) || 10;
  try {
    fs.createReadStream(filePath)
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
    const filePath = 'src/resources/report.csv';
    const requestedFilePath = req.body.id;

    let found = false;

    const stream = fs.createReadStream(filePath).pipe(csvParser());

    stream.on('data', (row) => {
        if (row.ID === requestedFilePath) {
            found = true;
            // Wrap the text in a JSON object before sending
            res.json({ text: row.Code });
            stream.destroy(); // Ensure to end the stream early
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
    const filePath = 'src/resources/report.csv'; // Ensure the file path and extension are correct
    const resultsSet = new Set(); // To store unique filenames

    const page = parseInt(req.body.page, 10) || 1;
    const pageSize = parseInt(req.body.pageSize, 10) || 10;

    fs.createReadStream(filePath)
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

module.exports = { getCodeCommentsByFilePath, getFileList, getCode };
