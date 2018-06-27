const express = require('express');

// const appRouter = require('./modules/router/index');
const businessRouter = require('./modules/router/business');
const questionRouter = require('./modules/router/question');
const testRouter = require('./modules/router/test');
const cors = require('cors');
const connection = require('./connection/index');
const bodyParser = require('body-parser');
const app = express();
const IP = 'localhost';
const PORT = 4001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/question', questionRouter);
app.use('/api/v1/test', testRouter);
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