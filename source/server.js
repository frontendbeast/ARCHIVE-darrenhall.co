var express = require('express');
var app = express();

var PORT = (process.env.NODE_ENV == 'production') ? 4000 : 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(PORT, 'localhost', function() {
    console.log('Listening on port ' + PORT);
});
