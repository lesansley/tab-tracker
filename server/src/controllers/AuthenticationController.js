const user = require('../models/User');
const db = require('../db');
const error = require('../utils/error');

module.exports = {
	async register (req, res) {
    const dbase = db.get();
    let emailCount, data;
    try {
      await user;
      emailCount = await dbase.collection('user').find( { email: req.body.email } ).count();
      if(emailCount !== 0) throw error.checkUser;
      data = await dbase.collection('user').insertOne(req.body);
      res.send(data.ops[0]);
      console.log(data);
    } catch (err) {
      res.send( {err: err.code} );
      console.error(`${err.name} (${err.code}): ${err.message}`);
    }
  }
};
