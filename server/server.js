const express = require('express');

const questionRouter = require('./modules/router/question');
const userRouter = require('./modules/router/user');
const businessRouter = require('./modules/router/business');

const connection = require('./connection/index');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const IP = 'localhost';
const PORT = 4001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/api/v1/question', questionRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/business', businessRouter);

// eslint-disable-next-line no-console
// console.log(app);

app.post('/api/v1/login', (req, res) => {
  console.log(req.body)
  res.status(200).send({status: 'logon '});
});

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