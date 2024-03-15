const fs = require('fs');
const csvParser = require('csv-parser');
const CodeLineDTO = require("../dto/CodeLine");

async function getCodeComments(req, res) {
  try {
    const filePath = 'src/resources/report.csv'; // Ensure the file path and extension are correct
    const results = []; // To store instances of CodeLineDTO

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        const dto = { ...CodeLineDTO, ...row };
        dto.id = parseInt(dto['Comment ID'], 10); 
        dto.filePath = dto.File;
        dto.status = dto.Status;
        dto.text = dto.Text.replace(/\\n/g, '\n');
        dto.meta = dto.Meta;
        delete dto.File; // Remove CSV specific fields not needed in DTO
        delete dto['Comment ID'];
        delete dto.Status;
        delete dto.Text;
        delete dto.Meta;
        results.push(dto);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        res.send(results); 
      });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Error reading file');
  }
}

module.exports = { getCodeComments };
