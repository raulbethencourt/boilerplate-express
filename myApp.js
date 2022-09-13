const express = require('express');
const app = express();
const root = __dirname + '/views/index.html';
const public = __dirname + '/public';

app.use('/public', express.static(public));

app.get('/', (req, res) => {
    res.sendFile(root);
});

app.get('/json', (req, res) => {
    res.json({ message: 'Hello json' });
});

module.exports = app;
