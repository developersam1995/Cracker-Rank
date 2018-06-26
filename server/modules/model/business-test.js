const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
  company_id: Object,
  title: String,
  description: String,
  startDate: String,
  endDate: String,
  duration: Number,
  questionID: Array,
  avatar: String
});


module.exports = mongoose.model('test', TestSchema);