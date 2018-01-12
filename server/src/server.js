const http = require('http');

const app = require('./app');
const config = require('./config/config');

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Listening on Port ${config.port}`);
});
