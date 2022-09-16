require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const root = __dirname + '/views/index.html';
const assets = __dirname + '/public';

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(assets));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(root);
});

app.get('/json', (req, res) => {
    let json_txt = 'Hello json';

    if (process.env.MESSAGE_STYLE == 'uppercase') {
        json_txt = json_txt.toUpperCase();
    }

    res.json({ message: json_txt });
});

app.get(
    '/now',
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.json({ time: req.time });
    }
);

app.get('/:word/echo', (req, res, next) => {
    let word = req.params.word;
    res.json({ echo: word });
});

app.route('/name')
    .get((req, res, next) => {
        res.json({ name: req.query.first + ' ' + req.query.last });
    })
    .post((req, res) => {
        res.json({ name: req.body.first + ' ' + req.body.last });
    });

module.exports = app;
