'use strict';

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
	partialsDir: [path.join(__dirname, 'views/partials')]
});

// Remove header
app.disable('x-powered-by');

// Use handlebars as the view engine
app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Home page routing
app.get('/', function(req, res) {
    res.render('home');
});

// Blog post routing
app.get('/blog/to-inline-or-not-to-inline', function(req, res) {
    res.render('blog/to-inline-or-not-to-inline');
});

// Unless port is set by mocha, use 4000 for production or 3000 otherwise
const PORT = process.env.PORT || (process.env.NODE_ENV == 'production') ? 4000 : 3000;

// Expose the app for mocha
module.exports = app;

// If app is not being ran by mocha, listen
if (!module.parent) {
    app.listen(PORT, 'localhost', function() {
        console.log("Server listening on port " + PORT);
    });
}
