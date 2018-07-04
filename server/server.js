const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
const cors = require('cors');

// Database connection
mongoose.connect(keys.mongoURI, () => {
  console.log('connected to database');
});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/react-app',express.static('public/assets'));

app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get('/', (req, res) => {
  res.sendfile('index.html');
});
app.use('/api/v1/users', require('./modules/routes/users'));
app.use('/api/v1/question', require('./modules/routes/question'));
app.use('/api/v1/test', require('./modules/routes/test'));

app.get('/api/v1/', (req, res) => {
  res.send('Welcome to CrackerRank API');
});


app.listen(keys.server.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on http://${keys.server.ip}:${keys.server.port}`);
  }
});

