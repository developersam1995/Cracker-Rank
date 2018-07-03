const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
  companyId: Object,
  questionsId: [String],
  duration: Number,
  title: String,
  description: String,
  startDate: String,
  endDate: String,
  registeredCandidates: [String],
  candidates: [{
    id: String,
    result: [Number]
  }]
});

module.exports = mongoose.model('test', TestSchema);