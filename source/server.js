'use strict';

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const pm2 = require('pm2');
const store = require('./store');

const app = express();

const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'default',
  helpers: { 'markdown': require('helper-markdown')},
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

//
app.use(function(req, res, next) {
  if(req.headers['content-type'] === 'application/vnd.contentful.management.v1+json') {
    store.update().then((results) => {
      res.sendStatus(200);
      pm2.connect((err) => pm2.restart('all'));
    }, (error) => res.sendStatus(500));
  } else {
    next();
  }
});

// Home page routing
app.get('/', function(req, res) {
    const data = require('./data/index.json');
    res.render('home', data);
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
