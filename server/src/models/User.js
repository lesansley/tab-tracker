const db = require('../db');
const error = require('../utils/error');

const coll = 'user';
const validator = {
  $and: [
    { email: { $regex: /^[\w.+'-]{2,}[@][\w.+-]{2,}$/ } },
    { password: { $type: 'string' } },
  ]
};

module.exports = async () => {
  try {
    let collection = await collectionDoesExist(coll);
    if(!collection) {
      await createCollection(coll, { validator } );
    }
    return true;
  } catch (err) {
    console.error(err);
    throw
  }
};

async function collectionDoesExist(collectionName) {
  try {
    let coll = await db.get().collection(collectionName);
    let count = await coll.find().count();
    return count && count > 0 ? true : false;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createCollection(collectionName, options) {
  try {
    await db.get().createCollection(collectionName, options);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
