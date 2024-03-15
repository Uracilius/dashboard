const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

const { getCodeComments } = require('./src/controllers/commentController');


app.get('/comments', getCodeComments);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
