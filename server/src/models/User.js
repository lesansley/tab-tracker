const db = require('../db');
const regex = require('../utils/regex');
const error = require('../utils/error');

const coll = 'user';
const validator = {
  $and: [
    { email: { $regex: regex.email } },
    { password: { $type: 'string' } }
  ]
};

module.exports = async () => {
  try {
    let collection = await collectionDoesExist(coll);
    if (!collection) {
      await createCollection(coll, { validator });
    }
    return true;
  } catch (err) {
    console.error(err);
    throw error.dbConnection;
  }
};

async function collectionDoesExist (collectionName) {
  try {
    let coll = await db.get().collection(collectionName);
    let count = await coll.find().count();
    return count && count > 0;
  } catch (err) {
    throw err;
  }
}

async function createCollection (collectionName, options) {
  try {
    await db.get().createCollection(collectionName, options);
  } catch (err) {
    throw err;
  }
}
