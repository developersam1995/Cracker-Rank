const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema({
  id: Object,
  email: String,
  password: String,
  Name: String,
  mobile: Number,
  companyName: String,
  address: String,
  type: String,
});

module.exports = mongoose.model('business', BusinessSchema);