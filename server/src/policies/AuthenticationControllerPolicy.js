const Joi = require('joi');
const err = require('../utils/error');
const regex = require('../utils/regex');

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().regex(regex.password).required()
    };

    const {error} = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
      case 'email':
        console.error(err.emailFormat);
        res.status(400).send({error: err.emailFormat.code});
        break;
      case 'password':
        console.error(err.passwordFormat);
        res.status(400).send({error: err.passwordFormat.code});
        break;
      default:
        console.error(err.unknown);
        res.status(400).send({error: err.unknown.code});
        break;
      }
    } else {
      next();
    }
  }
};
