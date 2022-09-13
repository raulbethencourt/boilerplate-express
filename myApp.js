require('dotenv').config();
const express = require('express');
const app = express();
const root = __dirname + '/views/index.html';
const public = __dirname + '/public';

app.use('/public', express.static(public));

app.get('/', (req, res) => {
    res.sendFile(root);
});

app.get('/json', (req, res) => {
    let txt = 'Hello json';

    if (process.env.MESSAGE_STYLE == 'uppercase') {
        var json_txt = txt.toUpperCase();
    }

    res.json({ message: json_txt });
});

module.exports = app;
