const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

const { fetchLeetCodeData } = require('./src/api/leetcode');

const { getCodeAlertsByFilePath, getCode, getAlertStatistics, getFileListWithFilter } = require('./src/controllers/commentController');
const handleErrors = require('./src/util/errorHandler');

app.post('/alerts', getCodeAlertsByFilePath);
app.post('/fileList', getFileListWithFilter);
app.post('/code', getCode);
app.get('/alertStatistics', getAlertStatistics);

app.get('/leetcode/:id', fetchLeetCodeData);
app.use(handleErrors)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
