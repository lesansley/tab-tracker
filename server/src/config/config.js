module.exports = {
	port: process.env.PORT || 8081,
	db: {
		url: process.env.DB_URL || 'ds161336.mlab.com:61336',
		user: process.env.DB_USER || 'ansley',
		password: process.env.DB_PASS || 'tabtracker',
    name: process.env.DB_NAME || 'tab-tracker',
	}
};
