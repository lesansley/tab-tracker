const user = require('../models/User');
const db = require('../db');

module.exports = {
	register (req, res) {
    user()
      .then( db.get().collection('user').insertOne(req.body)
        .then( (data) => {
          res.send(data.ops[0]);
          console.log(data);
          logEvent(data);
        })
        .catch( err => error(err, res ) )
        )
      .catch( err => error(err, res ) );
  }
};

function error(err, res) {
  switch(err.code) {
    case 121:
      // CODE FOR VALIDATION ERR
      break;
    default:
      break;
  }
  res.send( {err: err.code} );
  console.error(`Error saving user to database:`, err.message);
}

function logEvent(ev) {
  return new Promise( (resolve, reject) => {
    //NEED TO SET UP EVENT LOGGING
    resolve();
  });
}
