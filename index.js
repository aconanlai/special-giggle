const express = require('express');
const GoogleSpreadsheet = require('google-sheets-node-api');

const app = express();

const creds = require('./credentials.json');

const mySheet = new GoogleSpreadsheet('10-N60JCXZubcVyTUs02yaJjid7o2SBZ6-xtSXtmaiQE');

let workSheet = [];

app.get('/msgs', (req, res) => {
  workSheet.getRows().then(rows => res.send(rows));
});

app.get('/msg', (req, res) => {
  workSheet.addRow({ date: 'deez', message: 'nuts' })
    .then(success => res.send('success'))
    .catch(err => console.log(err));
});

mySheet.useServiceAccountAuth(creds).then(mySheet.getSpreadsheet.bind(mySheet)).then((sheet_info) => {
  workSheet = sheet_info.worksheets[0];
  app.listen(3000);
});
