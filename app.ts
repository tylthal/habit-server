import express = require('express');
import GitKitClient = require('gitkitclient');
import fs = require('fs');
import http = require('http');
import cookieParser = require('cookie-parser');
import db = require('./db');
import bodyParser = require('body-parser');
import {Category} from './classes/category';

var port = 3000;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var clientPath = __dirname.replace("server", "tracker");
app.use('/node_modules', express.static(clientPath + '/node_modules'));
app.use('/app', express.static(clientPath + '/app'));
app.use(cookieParser());

var dB = new db.db();

var gitkitConfig = JSON.parse(fs.readFileSync('./gitkit-server-config.json', 'utf-8'));
gitkitConfig.serviceAccountPrivateKey = fs.readFileSync(gitkitConfig.pemFile, 'utf-8');
var gitkitClient = new GitKitClient(gitkitConfig);

function validateCookie(req, callback: Function) {
  var gToken = req.cookies['gtoken'];
  gitkitClient.verifyGitkitToken(gToken, function(err, response) {
    if(err) {
      console.log(req.path + ': ' + err);
      callback({"valid": false});
    } else {
      callback({"valid": true, "user_id": response.user_id});
    }
  });
}

app.get('/', function (req, res) {
  res.sendFile(clientPath + '/index.html');
});

app.get('/index.html', function(req, res) {
  res.sendFile(clientPath + '/index.html');
});

app.get('/signin.html', function(req, res) {
  res.sendFile(clientPath + '/signin.html');
});

app.get('/validateuser', function (req, res) {
    validateCookie(req, function(response: any) {
      if(!response.valid) {
        res.send({"valid": false});
      } else {
        dB.verifyUserInDb(response, function(result) {
          res.send({"valid": response.valid, "user_id": response.user_id});
        });
      }
    });
});

app.get('/categories', function(req, res) {
  validateCookie(req, (response) => {
    if(!response.valid) {
        res.status(401).json(undefined);
    } else {
      dB.getCategories(response.user_id, function(response) {
        res.json(response);
      });
    }
    //var cats = new Array<Category>();
    //var cat = new Category("kldaf", "Home", "habits to work on around the house.");
    //cats.push(cat);
    //res.json(cats);
  });
});

app.post('/category', function(req, res) {
    validateCookie(req, (response) => {
      if(!response.valid) {
        res.status(401).json({"inserted": false});
        return;
      }
      dB.addCategory(response.user_id, req.body.name, req.body.description, (err, result) => {
        if(err) {console.log(err)}
        res.json({"inserted":err==undefined, "id":result});
      });
    });
});

app.listen(port, function () {
  console.log('Server listening on port %d in %s mode', port, app.settings.env);
});
