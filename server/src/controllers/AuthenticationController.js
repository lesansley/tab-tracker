const user = require('../models/User');
const db = require('../db');

module.exports = {
	register (req, res) {
    user()
      .then( () => {
        db.get().collection('user').insertOne(req.body)
          .then( (data) => {
            res.send(data.ops[0]);
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
            console.error(`Error saving document to database:`, err.message);
          });
      })
      .catch( err => {
        console.error(`Error creating collection in database:`, err.message);
      });
  }
};
