'use strict';

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

var hbs = exphbs.create({
        extname: 'hbs',
        defaultLayout: 'default',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.render('home');
});

// Production server runs on port 4000, development is port 3000
var PORT = (process.env.NODE_ENV == 'production') ? 4000 : 3000;

app.listen(PORT, 'localhost', function() {
    console.log('Listening on port yeah' + PORT);
});
