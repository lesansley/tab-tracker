const config = require('../config/config');

module.exports = {
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
	dataValidity: {
		code: 3,
		name: config.projectName,
		message: 'Submitted data is not valid'
	}
};
