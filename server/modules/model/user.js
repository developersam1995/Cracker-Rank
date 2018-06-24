const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  password: String
});

module.exports = mongoose.model('user', UserSchema);