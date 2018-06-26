const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const cors = require('cors');
const app = express();
const IP = 'localhost';
const PORT = 4001;

const keys = require('./config/keys');
const questionRouter = require('./modules/router/question');
const registerRouter = require('./modules/router/register');
const User = require('./modules/model/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

User.findOne({username: 'abhishek.kumar@mounblue.com'}, function(err, user){
  console.log('user', err, user)
})

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log(username, done);
    User.findOne({ username: username }, function (err, user) {
      console.log(err, user, 'user');
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // if (!user.authenticate(password), function(err,data) {
      //   console.log('Password verified', err, data)
      // }) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      user.authenticate(password, function(err, data){
        console.log(err, data, 'password verified')
      })
      return done(null, user);
    });
  }
));

//database connection
// mongoose.connect('mongodb://localhost:27017/crackerrank');
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to database');
});

app.use('/api/v1/question', questionRouter);
// app.use('/api/v1/register', registerRouter);

app.post('/api/v1/register', (req, res) => {
  User.findOne({ username: req.body.email }).then(user => {
    if (user) {
      res.status(200).send({ msg: 'Email is already taken' });
    } else {
      User.register(
        new User(
          {
            username: req.body.email,
            name: req.body.name,
            mobile: req.body.mobile,
            type: req.body.type
          }
        ), req.body.password, (err, user) => {
          if (err) {
            res.status(200).send({ msg: 'Please try again later' });
          } else {
            res.status(201).send({ msg: 'Successfully Registered.' });
            // passport.authenticate('local')(req, res, () => {
            //   console.log('passport: ', res);
            // });
          }
        });
    }
  });
});


app.post('/api/v1/login'
  , passport.authenticate('local')
  , (req, res) => {
    
  });


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ msg: 'not loggedin' });
}

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