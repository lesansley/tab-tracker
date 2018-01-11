const mongoose = require('mongoose');
const config = require('./config/config');
const error = require('./utils/error');

const url = `mongodb://${config.db.user}:${config.db.password}@${config.db.url}/${config.db.name}`;

module.exports = {
  async connect () {
    if (this.db) return console.log('Connected to database');
    try {
      await mongoose.connect(url);
      this.db = mongoose.connection;
      console.log('Connected to database');
      return true;
    } catch (err) {
      console.error(err);
      throw error.dbConnection;
    }
  },

  get () {
    return this.db;
  },

  async close () {
    if (!this.db) return ('Not connected to database');
    try {
      await this.db.close();
      this.db = null;
      console.log('Connection to database closed');
    } catch (err) {
      console.error(`Unable to close connection to database: ${err}`);
    }
  }
};
