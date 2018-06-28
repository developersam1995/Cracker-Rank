const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  // id: Object,
  username: String,
  password: String,
  name: String,
  mobile: Number,
  companyName: String,
  address: String,
  type: String,
  userProfileRec: {
    tests: [String] 
  },
  userProfileDev: {
    practicedQuestions: [String],
    tests: [String]
  }
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema);