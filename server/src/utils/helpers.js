const bcrypt = require('bcrypt');
const error = require('../utils/error');

module.exports = {
  async hashPassword (password) {
    const saltRounds = 10;
    try {
      let hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (err) {
      console.error(err);
      throw error.unkown;
    }
  },

  async comparePassword (candidatePassword, hash) {
    try {
      return await bcrypt.compare(candidatePassword, hash);
    } catch (err) {
      console.error(err);
      throw error.unkown;
    }
  }
};
