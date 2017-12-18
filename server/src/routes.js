//const AuthenticationController = require('./controllers/AuthenticationController');

module.exports = (app) => {
	app.post('/register', (req, res) => {
    res.send(req.body);
    // app.db.collection('user').save(req.body, (err, result) => {
    //   if (err) return console.log(err);

    //   console.log('saved to database');
    // });
  }).bind(app);
    //AuthenticationController.register
};
