const QuestionModel = require('../model/question');
const TestModel = require('../model/test');
const UserModel = require('../model/users');


module.exports = {

  insert: async (req, res, next) => {
    if (req.user.type == 'business') {
      const test = req.body;
      console.log(req.body);
     
      const newTest = new TestModel({
        companyId: req.user.id,
        questionsId: test.questionId,
        duration: test.duration,
        title: test.title,
        description: test.description,
        startDate: test.startDate,
        endDate: test.endDate
      });

      let result = await newTest.save();
      let update = await UserModel.updateOne({_id:req.user.id},
        {$addToSet:{'userProfileRec.tests':result.id}}); 

      // Respond with status
      return res.status(200).json({ status: 'Successfully Created', id:result.id });
    }
    if (req.user.type == 'developer') {
      
      const results = req.body.results;
      console.log(results);
      const testId = req.body.testId;
      const result = {id:req.user.id, result:results};
      let update = await TestModel.updateOne({_id:testId},
        {$push:{'candidates':result}}); 
      return res.status(200).json({status: 'submitted'});
    }
    res.status(400).send('unauthorized');
  },

  get: async (req, res, next) => {
    console.log(req);
    const  id  = req.query;
    console.log(id);

    let tests = null;
    if (id === 'all') {
      tests = await TestModel.find();
    } else {
      const ObjectID = require('mongoose').Types.ObjectId;
      if (ObjectID.isValid(id)) {
        tests = await TestModel.findById(id);
      } else {
        return res.status(404).json({ message: 'Not found' });
      }
    }

    if (tests) {
      res.status(200).json(tests);
    } else {
      res.status(404).json({ message: 'Not found' });
    }

  }
};