const MongoClient = require('mongodb').MongoClient;
const config = require('./config/config');

const state = { db: null };
const url = `mongodb://${config.db.user}:${config.db.password}@${config.db.url}/${config.db.name}`;

module.exports = {
  connect () {
    return new Promise ( (resolve, reject) => {
      if (state.db) resolve();
      MongoClient.connect(url)
        .then( (client) => {
          state.db = client.db(config.db.name);
          resolve();
        })
        .catch( (err) => {
          reject(err);
        });
    });
  },

  get () {
    return state.db;
  },

  close () {
    return new Promise ( (resolve, reject) => {
      if (state.db) {
        state.db.close()
          .then( () => {
            state.db = null;
            state.mode = null;
            resolve();
          })
          .catch( (err) => {
            reject(err);
          });
      }
      resolve();
    });
  }
};
