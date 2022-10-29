const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/users', (req, res) => {
  res.json([{
    "id": 1,
    "test1": '測試取得資料1'
  }, {
    "id": 2,
    "test2": '測試取得資料2'
  }]);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
