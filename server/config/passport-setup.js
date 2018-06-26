const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../modules/model/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  User.findById(id).then(user =>{
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done)=>{
    User.find({gooleID: profile.id}).then(user =>{
      if(user) {
        console.log('Already : ', user);
        done(null, user);
      } else {
        new User({
          username: profile.displayName,
          googleID: profile.id
        }).save().then(user => {
          console.log(user);
          done(null, user);
        });
      }
    });
  })
);