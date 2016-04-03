/*eslint-env node*/
'use strict';

var express = require('express'),
    path = require('path');

var app = express();

var portNumber = 3003;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/bundle.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/bundle.js'));
});

app.get('/main.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/main.css'));
});

app.listen(portNumber, function() {
  console.log('App listening on port ' + portNumber + '!');
});
