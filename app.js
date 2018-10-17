const express = require('express');
const server = express();
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.status(200).json({ msg: 'OK' });
});

// client POST localhost/data  x-www-form-urlencoded
// value=223
// see corresponding NodeMCU code: nodemcu_connect_server.ino
server.post('/data', (req, res) => {
  console.log(req.body.value);
  res.status(200).json({
    body_value: req.body.value
  });
});

// client GET localhost/data?value=334
server.get('/data', (req, res) => {
  const value = req.query.value;
  console.log(value);
  res.status(200).json({
    query_value: req.query.value
  });
});

// client GET localhost/data/:value
// eg:  GET localhost/data/335
// https://stackoverflow.com/questions/15128849/using-multiple-parameters-in-url-in-express
server.get('/data/:value/:value2', (req, res) => {
  res.status(200).json({
    params_value: req.params.value,
    params_value2: req.params.value2
  });
});

server.listen(3000, () => {
  console.log('server started on port 3000');
});
