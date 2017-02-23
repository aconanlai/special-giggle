const express = require('express');
const path = require('path');
const GoogleSpreadsheet = require('google-sheets-node-api');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use('/', express.static(__dirname + '/build'));

const creds = require('./credentials.json');

const mySheet = new GoogleSpreadsheet('10-N60JCXZubcVyTUs02yaJjid7o2SBZ6-xtSXtmaiQE');

let workSheet = [];

app.get('/msgs', (req, res) => {
  workSheet.getRows().then(rows => res.send(rows));
});

app.post('/msg', (req, res) => {
  workSheet.addRow({ date: new Date(), message: req.body.text })
    .then(success => res.json('success'))
    .catch(err => console.log(err));
});

app.get('/projector', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/projector.html'));
});

app.get('/input', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/input.html'));
});

mySheet.useServiceAccountAuth(creds).then(mySheet.getSpreadsheet.bind(mySheet)).then((sheet_info) => {
  workSheet = sheet_info.worksheets[0];
  app.listen(3000);
});
