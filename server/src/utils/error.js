const config = require('../config/config');

module.exports = {
	checkUser: {
		code: 1,
		name: config.projectName,
		message: 'This email has already been registered'
	},
	dbConnection: {
		code: 2,
		name: 'Database',
		message: 'Error connecting to the database'
	}
};
