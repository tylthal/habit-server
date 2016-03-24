import express = require('express');
import GitKitClient = require('gitkitclient');
//import * as GitKitClient from './node_modules/gitkitclient/lib/gitkitclient.js';

//declare var GitKitClient: any;

//declare var express: any;

var port = 3003;
var app = express();
//var gitkitClient = new GitKitClient({});

app.get('/', function (req, res) {
  res.send('Test');
});

app.get('/validateuser', function(req, res) {

});

app.listen(port, function () {
  console.log('Server listening on port %d in %s mode', port, app.settings.env);
});
