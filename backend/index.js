const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

const { fetchLeetCodeData, getHeatmapSVG } = require('./src/api/leetcode');

const { getFileList, getCodeAlertsByFilePath, getCode, getAlertStatistics } = require('./src/controllers/commentController');
const handleErrors = require('./src/util/errorHandler');

app.post('/alerts', getCodeAlertsByFilePath);
app.post('/fileList', getFileList);
app.post('/code', getCode);
app.get('/alertStatistics', getAlertStatistics);

app.get('/leetcode/:id', fetchLeetCodeData);
app.get('/leetcode/calendar/:id', getHeatmapSVG);
app.use(handleErrors)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
