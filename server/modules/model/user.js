const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  id: Object,
  email: String,
  password: String,
  name: String,
  mobile: Number,
  companyName: String,
  address: String,
  type: String,
  userProfileRec: mongoose.Schema.Types.Mixed,
  userProfileDev: mongoose.Schema.Types.Mixed
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema);