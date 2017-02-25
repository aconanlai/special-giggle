'use strict';

var express = require('express');
var path = require('path');
var GoogleSpreadsheet = require('google-sheets-node-api');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({ extended: true }));
app.use('/', express.static(__dirname + '/build'));

var creds = require('./credentials.json');

var mySheet = new GoogleSpreadsheet('10-N60JCXZubcVyTUs02yaJjid7o2SBZ6-xtSXtmaiQE');

var workSheet = [];

app.get('/msgs', function (req, res) {
  workSheet.getRows().then(function (rows) {
    return res.send(rows);
  });
});

app.post('/msg', function (req, res) {
  workSheet.addRow({ date: new Date(), message: req.body.text }).then(function (success) {
    return res.json('success');
  }).catch(function (err) {
    return console.log(err);
  });
});

app.get('/projector', function (req, res) {
  res.sendFile(path.join(__dirname + '/build/projector.html'));
});

app.get('/input', function (req, res) {
  res.sendFile(path.join(__dirname + '/build/input.html'));
});

mySheet.useServiceAccountAuth(creds).then(mySheet.getSpreadsheet.bind(mySheet)).then(function (sheet_info) {
  workSheet = sheet_info.worksheets[0];
  app.listen(3000);
});
