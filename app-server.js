const express = require('express');
const server = express();
const Sensor = require('./Sensor');
var value = 228;

server.get('/', (req, res) => {
  var value1 = req.query.sensor1;

  value = value1;
  const responsestr = `sensor1: ${value1}`;

  res.status(200).send(responsestr);
  console.log(responsestr);
});

server.get('/getsensor1', (req, res) => {
  res.status(200).send(JSON.stringify(value));
});

server.listen(5000, () => {
  console.log('server started on port 5000');
});
