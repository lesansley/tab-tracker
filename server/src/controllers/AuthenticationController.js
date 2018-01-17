const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const db = require('../db');
const config = require('../config/config');
const User = require('../models/User');
const d = require('../utils/database');
const error = require('../utils/error');
const h = require('../utils/helpers');

function jwtSignUser (data) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(data, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

async function register (req, res) {
  let data = null;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password
  });
  try {
    await db.connect();
    data = await user.save();
    console.log(user, data);
    res.status(201).json({
      createdUser: data._doc.email,
      token: jwtSignUser(data._doc)
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({err: err.code});
  }
  try {
    await db.close();
  } catch (err) {
    console.error(err);
  }

/*
  let dbase, data;
  try {
    await db.connect();
    dbase = db.get();
    await d.checkDocumentIsUnique('user', 'email', req.body.email);
    req.body.password = await h.hashPassword(req.body.password);
    data = await dbase.collection('user').insertOne(req.body);
    res.status(200).json({
      user: data.ops[0],
      token: jwtSignUser(data.ops[0])
    });
    db.close();
  } catch (err) {
    console.error(err);
    res.status(400).json({err: err.code});
    db.close();
  }
  */
}

async function login (req, res) {
  let dbase, cursor, count;
  let docs = [];
  try {
    await db.connect();
    dbase = db.get();
    cursor = await dbase.collection('user').find({email: req.body.email});
    count = await cursor.count();
    if (count !== 1) {
      res.status(403).json({err: error.loginCredentials});
    } else {
      cursor.forEach(doc => {
        docs.push(doc);
      }, err => {
        if (err) {
          res.status(500).json({err: error.dbRecords});
        } else {
          h.comparePassword(req.body.password, docs[0].password)
            .then(isValid => {
              if (!isValid) {
                res.status(403).json({err: error.loginCredentials});
              } else {
                res.status(200).json({
                  user: docs[0],
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
    res.status(500).json({err: error.dbRecords});
    db.close();
  }
}

module.exports = {
  register,
  login
};
