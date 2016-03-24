import express = require('express');
import GitKitClient = require('gitkitclient');
import fs = require('fs');

//declare var GitKitClient: any;

//declare var express: any;

var port = 3003;
var app = express();
var gitkitClient = new GitKitClient(JSON.parse(fs.readFileSync('./gitkit-server-config.json', 'utf-8')));
gitkitClient.getAccountByEmail({"email":"tyler.thalman@gmail.com"}, function(error, result) {
    if(error) {
      console.log(error);
    } else {
      console.log(result);
    }
});


app.get('/', function (req, res) {
  res.send('Test');
});

app.get('/validateuser', function(req, res) {

});

app.get('/callback', function(req, res) {

});

app.listen(port, function () {
  console.log('Server listening on port %d in %s mode', port, app.settings.env);
});
