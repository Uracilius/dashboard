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
        if (row.File == req.body.filePath) {
          const dto = {
            ...CodeLineDTO,
            id: parseInt(row['Comment ID'], 10),
            filePath: row.File,
            status: row.Status,
            text: row.Text.replace(/\\n/g, '\n'),
            meta: row.Meta
          };
          results.push(dto);
          console.log(row.File, row.Status, row.Text, row.Meta)
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


async function getFileList(req, res){
  try {
    const filePath = 'src/resources/report.csv'; // Ensure the file path and extension are correct
    const resultsSet = new Set(); // To store unique filenames

    const page = parseInt(req.body.page, 10) || 1;
    const pageSize = parseInt(req.body.pageSize, 10) || 10;

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        resultsSet.add(row.File); 
      })
      .on('end', () => {
        console.log('List of files successfully processed');
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

module.exports = { getCodeCommentsByFilePath, getFileList };
