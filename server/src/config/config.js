module.exports = {
  projectName: 'tab-tracker',
  projectId: '',
  port: process.env.PORT,
  db: {
    url: process.env.MONGO_MLAB__URL,
    user: process.env.MONGO_MLAB__USER,
    password: process.env.MONGO_MLAB__PASS,
    name: process.env.MONGO_MLAB__NAME
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET
  }
};
