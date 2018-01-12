const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app
  .use(morgan('combined'))
  .use(bodyParser.json())
  .use(cors());

require('./routes')(app);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
