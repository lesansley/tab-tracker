const jwt = require('jsonwebtoken');

const db = require('../db');
const config = require('../config/config');
const user = require('../models/User');
const d = require('../utils/database');
const error = require('../utils/error');
const h = require('../utils/helpers');

function jwtSignUser (data) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(data, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async register (req, res) {
    let dbase, data, hash;
    try {
      await db.connect();
      dbase = db.get();
      await user;
      await d.checkDocumentIsUnique('user', 'email', req.body.email);
      hash = await h.hashPassword(req.body.password);
      req.body.password = hash;
      data = await dbase.collection('user').insertOne(req.body);
      res.status(200).send(data.ops[0]);
      console.log(data);
      db.close();
    } catch (err) {
      console.error(err);
      res.status(400).send({err: err.code});
      db.close();
    }
  },
  async login (req, res) {
    let dbase, cursor, count;
    let docs = [];
    try {
      await db.connect();
      dbase = db.get();
      cursor = await dbase.collection('user').find({email: req.body.email});
      count = await cursor.count();
      if (count !== 1) {
        res.status(403).send(error.loginCredentials);
      } else {
        cursor.forEach(doc => {
          docs.push(doc);
        }, err => {
          if (err) {
            res.status(500).send(error.dbRecords);
          } else {
            h.comparePassword(req.body.password, docs[0].password)
              .then(isValid => {
                if (!isValid) {
                  res.status(403).send(error.loginCredentials);
                } else {
                  res.status(200).send({
                    data: docs[0],
                    token: jwtSignUser(docs[0])
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
          db.close();
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(error.dbRecords);
      db.close();
    }
  }
};
