console.log('Hello');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app
	.use(morgan('combined'))
	.use(bodyParser.json())
	.use(cors())
	.get('/status', (req, res) => {
		res.send({
			message: 'hello world'
		});
	});

app.listen(process.env.PORT || 8081);
