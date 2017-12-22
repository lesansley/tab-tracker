const MongoClient = require('mongodb').MongoClient;
const config = require('./config/config');

const state = { db: null };
const url = `mongodb://${config.db.user}:${config.db.password}@${config.db.url}/${config.db.name}`;

module.exports = {
  connect () {
    return new Promise ( (resolve, reject) => {
      if (state.db) return resolve();
      MongoClient.connect(url)
        .then( client => {
          state.db = client;
          resolve();
        })
        .catch( err => reject(err));
    });
  },

  get () {
    return state.db.db(config.db.name);
  },

  close () {
    return new Promise ( (resolve, reject) => {
      if (!state.db) return resolve();
      state.db.close()
        .then( () => {
          state.db = null;
          console.log('Connection to database closed');
          resolve();
        })
        .catch( err => reject(err));
    });
  }
};
