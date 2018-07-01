const QuestionModel = require('../model/question');


module.exports = {
  
  insert: async (req, res, next) => {
    const question = req.body;
    
    const newQuestion = new QuestionModel({
      title: question.title,
      problemDescription: question.problemDescription,
      exampleInputs: question.exampleInputs,
      exampleOutput: question.exampleOutput,
      testCases:question.testCases,
      functionName: question.functionName,
      paramNames: question.paramNames
    })
    
    await newQuestion.save();
    
    // Respond with status
    res.status(200).json({ status: "Successfully Created" });
  },
  
  get: async (req, res, next) => {
    const { id } = req.query;
    
    let questions = null;
    if(id === 'all') {
      questions = await QuestionModel.find()
    } else if(id === 'random') {
      questions = await QuestionModel.find();
      questions = questions[Math.floor(Math.random() * questions.length)]
    } else {
      const ObjectID = require('mongoose').Types.ObjectId;
      if(ObjectID.isValid(id)) {
        questions = await QuestionModel.findById(id);
      } else {
        return res.status(404).json({message: 'Not found'})
      }
    }
    
    if(questions) {
      res.status(200).json(questions);
    } else {
      res.status(404).json({message: 'Not found'})
    }
    
  }
}