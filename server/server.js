const express = require('express');
const questionRouter = require('./modules/router/question');
const connection = require('./connection/index');
const bodyParser = require('body-parser');
const app = express();
const IP = 'localhost';
const PORT = 4001;

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/v1/question', questionRouter);

// eslint-disable-next-line no-console
// console.log(app);

app.get('/api/v1/', (req, res) => {
  res.send('Welcome to CrackerRank API');
});

app.get('/', (req, res) => {
  res.redirect('/api/v1/');
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on http://${IP}:${PORT}`);
  }
});