const MongoClient = require('mongodb').MongoClient;
const config = require('./config/config');

const url = `mongodb://${config.db.user}:${config.db.password}@${config.db.url}/${config.db.name}`;

module.exports = {
  async connect () {
      if (this.db) return console.log('Connected to database');
      try {
        this.db = await MongoClient.connect(url);
      } catch (err) {
        console.alert(`Unable to connect to database: ${err}`);
      }
  },

  async get () {
    return this.db;
  },

  async close () {
    if (!this.db) return ('Not connected to database');
    try{
      await this.db.close()
      this.db = null;
      console.log('Connection to database closed');
    } catch (err) {
      console.alert(`Unable to close connection to database: ${err}`);
    }
  }
};
