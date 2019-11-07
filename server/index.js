const express = require('express');
const path = require('path');
const app = express();
const logger = require('./logger');

const port = process.env.PORT || 8080;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../build')));

app.get('/ping', function(req, res) {
  return res.send('pong');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Set up JSON storage
require('./storage')(app);

app.listen(port, null, err => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port);
});
