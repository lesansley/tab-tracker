const MongoClient = require('mongodb').MongoClient;
const config = require('./config/config');
const error = require('../utils/error');

const url = `mongodb://${config.db.user}:${config.db.password}@${config.db.url}/${config.db.name}`;

module.exports = {
  async connect () {
      if (this.db) return console.log('Connected to database');
      try {
        this.db = await MongoClient.connect(url);
        console.log('Connected to database');
        return true;
      } catch (err) {
        console.error(err);
        throw error.dbConnection;
      }
  },

  get () {
    return this.db.db(config.db.name);
  },

  async close () {
    if (!this.db) return ('Not connected to database');
    try{
      await this.db.close()
      this.db = null;
      console.log('Connection to database closed');
    } catch (err) {
      console.error(`Unable to close connection to database: ${err}`);
    }
  }
};
