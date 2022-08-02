'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var express = require('express');
var servingBack_1 = require('./utils/servingBack');
var imageResizing_1 = require('./utils/imageResizing');
var app = express();
var port = 3000;
app.get(
  '/api/images',
  imageResizing_1.editPicture,
  servingBack_1.default,
  function (req, res) {}
);
app.get('/api', function (req, res) {
  res.send('Server working fine...');
});
app.listen(port, function () {
  console.log('server started at http://localhost:'.concat(port));
});
exports.default = app;
