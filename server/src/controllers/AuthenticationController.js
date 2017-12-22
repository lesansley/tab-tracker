const user = require('../models/User');
const db = require('../db');

module.exports = {
	register (req, res) {
    user()
      .then( () => {
        db.get()
          .collection('user').insertOne(req.body)
            .then( (data) => {
              req.body.regDate = Date.now();
              res.send(req.body);
              console.log(data);
            })
            .catch( err => {
              switch(err.code) {
                case 121:
                  // CODE FOR VALIDATION ERR
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
