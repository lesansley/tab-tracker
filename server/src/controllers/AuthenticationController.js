const user = require('../models/User');
const db = require('../db');

module.exports = {
	register (req, res) {
    user()
      .then( () => {
        db.get()
          .collection('user').save(req.body)
            .then( () => {
              res.send(req.body);
              console.log('saved to database');
            })
            .catch( err => {
              switch(err.code) {
                case 121:
                  // VALIDATION ERR
                  break;
                default:
                  break;
              }
              res.send( {err: err.code} );
              console.error(`Error saving user to database:`, err.message);
            });
      })
      .catch( err => {
        console.error(err.message);
      });
  }
};
