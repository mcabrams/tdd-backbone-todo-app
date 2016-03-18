var express = require('express'),
    path = require('path');

var app = express();

var portNumber = 3003;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/bundle.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/bundle.js'));
})

app.listen(portNumber, function() {
  console.log('App listening on port ' + portNumber +'!');
})
