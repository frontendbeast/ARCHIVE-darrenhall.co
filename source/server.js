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

// Unless port is set by mocha, use 4000 for production or 3000 otherwise 
var PORT = process.env.PORT || (process.env.NODE_ENV == 'production') ? 4000 : 3000;

// Expose the app for mocha
module.exports = app;

// If app is not being ran by mocha, listen
if (!module.parent) {
    app.listen(PORT, 'localhost', function() {
        console.log("Server listening on port " + app.get('port'));
    });
}
