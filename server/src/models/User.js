const db = require('../db');

module.exports = () => {
  return new Promise( (resolve, reject) => {
    db.get().createCollection( 'user',
      { validator: { $and:
        [
         { email: { $regex: /^[\w.+'-]{2,}[@][\w.+-]{2,}$/ } },
         { password: { $type: 'string' } },
        ]
      }})
      .then(() => {
        resolve();
      })
      .catch((err) =>{
        reject(err);
      });
  });
};
