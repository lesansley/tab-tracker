const db = require('../db');

const coll = 'user';
const validator = {
  $and: [
    { email: { $regex: /^[\w.+'-]{2,}[@][\w.+-]{2,}$/ } },
    { password: { $type: 'string' } },
  ]
};

module.exports = () => {
  return new Promise( (resolve, reject) => {
    collectionDoesExist(coll)
      .then( (res) => {
        if(res) return resolve();
        createCollection(coll, { validator } )
          .then( () => setFieldAsUniqueIndex(coll, 'email') )
          .then( () => resolve() )
          .catch( err => reject(err));
      })
      .catch( err => reject(err));
  });
};

function setFieldAsUniqueIndex(collectionName, field) {
  return new Promise( (resolve, reject) => {
    db.get().collection(collectionName).createIndex( { [field] : 1 }, { unique: true }  )
      .then( res => resolve(res) )
      .catch( err => reject(err) );
  });
}

function collectionDoesExist(collectionName) {
  return new Promise( (resolve, reject) => {
    db.get().collection(collectionName).find().count()
      .then( res => resolve(res) )
      .catch( err => reject(err) );
  });
}

function createCollection(collectionName, options) {
  return new Promise( (resolve, reject) => {
    db.get().createCollection(collectionName, options)
      .then( res => resolve(res) )
      .catch( err => reject(err) );
  });
}
