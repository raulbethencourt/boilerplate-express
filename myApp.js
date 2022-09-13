require('dotenv').config();
const express = require('express');
const app = express();
const root = __dirname + '/views/index.html';
const assets = __dirname + '/public';

app.use('/public', express.static(assets));

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

app.get('/', (req, res) => {
	res.sendFile(root);
});

app.get('/json', (req, res) => {
	let txt = 'Hello json';

	if (process.env.MESSAGE_STYLE == 'uppercase') {
		json_txt = txt.toUpperCase();
	} else {
		json_txt = txt;
	}

	res.json({ message: json_txt });
});

module.exports = app;
