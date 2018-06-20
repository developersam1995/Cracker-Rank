const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  id: Object,
  title: String,
  problem: String,
  inputFormat: String,
  outputFormat: String,
  note: String,
  sampleTestcase: Object,
  mainTestcase: Object,
  explanation: String,
  difficulty: String,
  maxScore: Number,
  author: String
});

module.exports = mongoose.model('question', QuestionSchema);