module.exports = {
  projectName: 'tab-tracker',
  projectId: '',
  port: process.env.PORT || 8081,
  db: {
    url: process.env.MONGO_MLAB__URL || 'ds161336.mlab.com:61336',
    user: process.env.MONGO_MLAB__USER || 'ansley',
    password: process.env.MONGO_MLAB__PASS || 'tabtracker',
    name: process.env.MONGO_MLAB__NAME || 'tab-tracker'
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
};
