const user = require('../models/User');
const db = require('../db');
const error = require('../utils/error');

module.exports = {
	async register (req, res) {
    let connection, dbase, emailCount, data;
    try {
      await db.connect();
      dbase = db.get();
      await user;
      await checkUser();
      data = await dbase.collection('user').insertOne(req.body);
      res.send(data.ops[0]);
      console.log(data);
      db.close();
    } catch (err) {
      res.send( {err: err.code} );
      console.error(err);
    }
  }
};

async function checkUser() {
  try {
    const emailCount = await dbase.collection('user').find( { email: req.body.email } ).count();
    if(emailCount !== 0) {
      throw error.checkUser;
    }
    return true;
  } catch (err) {
    throw err;
  }
}

async function inserRecord(coll, data) {
  const data = await
}
