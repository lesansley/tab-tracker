const assert = require('assert');

const user = require('../models/User');
const db = require('../db');
const regex = require('../utils/regex');
const error = require('../utils/error');
const d = require('../utils/database');

module.exports = {
	async register (req, res) {
    let connection, dbase, emailCount, data;
    try {
      await validateRegistrationCredentialsData(req.body);
      await db.connect();
      dbase = db.get();
      await user;
      await d.checkDocumentIsUnique('user', 'email', req.body.email);
      data = await dbase.collection('user').insertOne(req.body);
      res.send(data.ops[0]);
      console.log(data);
      db.close();
    } catch (err) {
      console.error(err);
      res.send( {err: err.code} );
      db.close();
    }
  }
};

async function validateRegistrationCredentialsData(data) {
  const email = regex.email.exec(data.email);
  const password = regex.password.exec(data.password)
  if(email && password) return true;
  throw error.dataValidity;
}
