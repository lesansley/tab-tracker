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
          .then( () => resolve() )
          .catch( err => reject(err));
      })
      .catch( err => reject(err));
  });
};

async function collectionDoesExist(collectionName) {
  try {
    let coll = await db.get().collection(collectionName);
    let count = await coll.find().count();
    if (count && count > 0) return true;
  } catch (err) {
    console.error(err);
  }

}

async function createCollection(collectionName, options) {
  try {
    await db.get().createCollection(collectionName, options);
  } catch (err) {
    console.error(err);
  }
}
