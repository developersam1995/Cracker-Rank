const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  title: String,
  problemDescription: String,
  exampleInputs: String,
  exampleOutput: String,
  testCases:[
    {
      input: [mongoose.Schema.Types.Mixed], 
      output: mongoose.Schema.Types.Mixed
    }
  ],
  functionName: String,
  paramNames: [String]
});

module.exports = mongoose.model('question', QuestionSchema);