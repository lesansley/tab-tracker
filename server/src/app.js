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
	.post('/register', (req, res) => {
		res.send({
			message: `Hello ${req.body.email} you have been registered.`
		});
	});

app.listen(process.env.PORT || 8081);
