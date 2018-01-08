const config = require('../config/config');

module.exports = {
  unknown: {
    code: 0,
    name: config.projectName,
    message: 'An unknown error has occurred'
  },
  documentUnique: {
    code: 1,
    name: config.projectName,
    message: 'This document is not unique'
  },
  dbConnection: {
    code: 2,
    name: 'Database',
    message: 'Error connecting to the database'
  },
  emailFormat: {
    code: 3,
    name: config.projectName,
    message: 'Email format is invalid'
  },
  passwordFormat: {
    code: 4,
    name: config.projectName,
    message: 'Password format is invalid'
  }
};
