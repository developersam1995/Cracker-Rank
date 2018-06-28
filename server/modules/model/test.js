const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
  companyId: Object,
  questionsId: [String],
  duration: Number,
  title: String,
  description: String,
  startDate: String,
  endDate: String,
  candidates: [{
    id: Object,
    result: [Number]
  }]
});

module.exports = mongoose.model('test', TestSchema);