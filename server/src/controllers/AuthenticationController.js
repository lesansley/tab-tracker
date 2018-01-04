const user = require('../models/User');
const db = require('../db');
const regex = require('../utils/regex');
const error = require('../utils/error');

module.exports = {
	async register (req, res) {
    let connection, dbase, emailCount, data;
    try {
      await validateData(req.body);
      await db.connect();
      dbase = db.get();
      await user;
      await checkUser(dbase, 'user', req.body);
      data = await insertRecord(dbase, 'user', req.body);
      res.send(data.ops[0]);
      console.log(data);
      db.close();
    } catch (err) {
      console.error(err);
      res.send( {err: err.code} );
    }
  }
};

async function checkUser(dbase, collection, data) {
  try {
    const emailCount = await dbase.collection(collection).find( { email: data.email } ).count();
    if(emailCount !== 0) {
      throw error.checkUser;
    }
    return true;
  } catch (err) {
    throw err;
  }
}

async function insertRecord(dbase, coll, data) {
  try {
    const record = await dbase.collection(coll).insertOne(data);
    return record;
  } catch (err) {
    throw err;
  }
}

async function validateData(data) {
  if(!regex.email.exec(data.email)) throw error.dataValidity;
  if(!regex.password.exec(data.password)) throw error.dataValidity;
  return true;
}
