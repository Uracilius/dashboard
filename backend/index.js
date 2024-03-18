const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

const { getFileList, getCodeCommentsByFilePath } = require('./src/controllers/commentController');


app.post('/comments', getCodeCommentsByFilePath);
app.post('/fileList', getFileList);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
