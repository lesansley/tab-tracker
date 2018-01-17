const mongoose = require('mongoose');
const regex = require('../utils/regex');
/*
const error = require('../utils/error');
*/
const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  email: {
    type: String,
    validate: {
      validator: v => {
        return regex.email.test(v);
      }
    },
    unique: true,
    required: true
  },
  password: {
    type: String,
    validate: {
      validator: v => {
        return regex.password.test(v);
      }
    },
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
