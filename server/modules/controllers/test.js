const QuestionModel = require('../model/question');
const TestModel = require('../model/test');


module.exports = {
  
  insert: async (req, res, next) => {
    const test = req.body;
    
    const newTest = new TestModel({
      companyId: test.companyId,
      questionsId: test.questionsId,
      duration: test.duration,
      title: test.title,
      description: test.description,
      startDate: test.startDate,
      endDate: test.endDate
    })
    
    await newTest.save();
    
    // Respond with status
    res.status(200).json({ status: "Successfully Created" });
  },
  
  get: async (req, res, next) => {
    const { id } = req.query;
    
    let tests = null;
    if(id === 'all') {
      tests = await TestModel.find()
    } else {
      const ObjectID = require('mongoose').Types.ObjectId;
      if(ObjectID.isValid(id)) {
        tests = await TestModel.findById(id);
      } else {
        return res.status(404).json({message: 'Not found'})
      }
    }

    if(tests) {
      res.status(200).json(tests);
    } else {
      res.status(404).json({message: 'Not found'})
    }
    
  }
}