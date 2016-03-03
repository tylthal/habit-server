import * as express from 'express';

var port = 3001;

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('Habit server listening on port %d in %s mode', port, app.settings.env);
});
