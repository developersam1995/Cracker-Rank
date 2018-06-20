const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id: Object,
  name: String,
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  phone: Number,
  avatar: String
});

module.exports = mongoose.model('user', UserSchema);