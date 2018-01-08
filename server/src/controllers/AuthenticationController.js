const user = require('../models/User');
const db = require('../db');
const d = require('../utils/database');

module.exports = {
  async register (req, res) {
    let dbase, data;
    try {
      await db.connect();
      dbase = db.get();
      await user;
      await d.checkDocumentIsUnique('user', 'email', req.body.email);
      data = await dbase.collection('user').insertOne(req.body);
      res.status(200).send(data.ops[0]);
      console.log(data);
      db.close();
    } catch (err) {
      console.error(err);
      res.status(400).send({err: err.code});
      db.close();
    }
  }
};
