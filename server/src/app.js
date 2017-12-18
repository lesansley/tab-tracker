const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;

const config = require('./config/config');

const app = express();

let db = {};

app
	.use(morgan('combined'))
	.use(bodyParser.json())
	.use(cors());

  // require('./routes')(app);

MongoClient.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.url}/${config.db.name}`, (err, client) => {
  if (err) return console.log(err);
  db = client.db(config.db.name);
  console.log(db);
  app.listen(config.port, () => {
    console.log(`Listening on Port ${config.port}`);
  });
});

app.post('/register', (req, res) => {
    console.log(db);
    db.collection('user').save(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log('saved to database');
      res.redirect('/register');
    });
  });
