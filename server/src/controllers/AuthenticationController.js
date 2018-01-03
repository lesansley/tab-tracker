const user = require('../models/User');
const db = require('../db');
const error = require('../utils/error');

module.exports = {
	async register (req, res) {
    let dbase, emailCount, data;
    try {
      await db.connect();
      dbase = db.get();
      await user;
      emailCount = await dbase.collection('user').find( { email: req.body.email } ).count();
      if(emailCount !== 0) throw error.checkUser;
      data = await dbase.collection('user').insertOne(req.body);
      res.send(data.ops[0]);
      console.log(data);
      db.close();
    } catch (err) {
      res.send( {err: err.code} );
      console.error(`${err.name} (${err.code}): ${err.message}`);
      db.close();
    }
  }
};
