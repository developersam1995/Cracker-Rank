const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  id: Object,
  title: String,
  problem: String,
  inputFormat: String,
  outputFormat: String,
  note: String,
  sampleTestcase: [Array],
  mainTestcase: [Array],
  explanation: String,
  difficulty: String,
  maxScore: parseInt(Number),
  author: String
});

module.exports = mongoose.model('question', QuestionSchema);