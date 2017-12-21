const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');

const config = require('./config/config');

const app = express();

app
	.use(morgan('combined'))
	.use(bodyParser.json())
	.use(cors());

require('./routes')(app);

db.connect()
  .then( () => {
    app.listen(config.port, () => {
      console.log(`Listening on Port ${config.port}`);
    });
  })
  .catch( (err) => {
    console.log(err);;
});
