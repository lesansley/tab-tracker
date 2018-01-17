const mongoose = require('mongoose');

const config = require('./config/config');
const error = require('./utils/error');

const url = `mongodb://${config.db.user}:${config.db.password}@${config.db.url}/${config.db.name}`;

mongoose.Promise = require('bluebird');

let db = null;

async function connect () {
  if (db) return console.log('Connected to database');
  try {
    await mongoose.connect(url, {
      useMongoClient: true
    });
    db = mongoose.connection;
    console.log('Connected to database');
    return true;
  } catch (err) {
    console.error(err);
    throw error.dbConnection;
  }
}

function get () {
  return db;
}

async function close () {
  if (!db) return ('Not connected to database');
  try {
    await db.close();
    db = null;
    console.log('Connection to database closed');
  } catch (err) {
    console.error(`Unable to close connection to database: ${err}`);
  }
}

module.exports = {
  connect,
  get,
  close
};
