const QuestionModel = require('../model/question');
const TestModel = require('../model/test');
const UserModel = require('../model/users');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  delete: async (req, res, next) => {
    let testId = req.query.id;
    console.log(typeof (req.query.id));
    let removeResult = await TestModel.remove({ _id: (testId) });
    if (removeResult.n)
      await UserModel.updateOne({ _id: req.user.id },
        {$pull : {'userProfileRec.tests': testId}});
    return res.status(200).send({ message: 'deleted' });
    res.status(400).send({ message: 'Invalid request' });
  },

  insert: async (req, res, next) => {
    if (req.user.type == 'business') {
      const test = req.body;
      console.log(req.body.questionId);

      const newTest = new TestModel({
        // companyId: req.user.id,
        questionsId: test.questionId,
        companyId: { $oid: req.user.id },
        questionsId: test.questionId,
        duration: test.duration,
        title: test.title,
        description: test.description,
        startDate: test.startDate,
        endDate: test.endDate
      });

      let result = await newTest.save();
      let update = await UserModel.updateOne({ _id: req.user.id },
        { $addToSet: { 'userProfileRec.tests': result.id } });

      // Respond with status
      return res.status(200).json({ status: 'Successfully Created', id: result.id });
    }
    if (req.user.type == 'developer') {

      const results = req.body.results;
      console.log('geting response', results);
      const testId = req.body.testId;
      const result = { id: req.user.id, result: results };
      let update = await TestModel.updateOne({ _id: testId },
        { $push: { 'candidates': result } });
      return res.status(200).json({ status: 'submitted' });
    }
    res.status(400).send('unauthorized');
  },

  get: async (req, res, next) => {

    const id = req.query.id;

    console.log('datas', req.query.id);
    let tests = null;
    if (id === 'all') {
      tests = await TestModel.find();
    } else {
      const ObjectID = require('mongoose').Types.ObjectId;
      if (ObjectID.isValid(id)) {
        tests = await TestModel.findById(id);
      } else {
        return res.status(404).json({ message: 'Not found' });
      };
    };

    if (tests) {
      res.status(200).json(tests);
    } else {
      res.status(404).json({ message: 'Not found' });
    };

  },

  getTestProfile: async (req,res,next)=>{
    let {id}=req.query;
    TestModel.aggregate([
      {
        $match:{
          _id:ObjectId(id)
        }
      }
    ],function(err,TestData){

      let arrQuestionIds=TestData[0].questionsId.map((quesId)=>ObjectId(quesId));
      let arrRegisteredCandidateIds=TestData[0].registeredCandidates.map((canId)=>ObjectId(canId));

      UserModel.aggregate([
        {
          $project:{
            name:1,
            mobile:1,
            'has_ids':{
              $in:['$_id',arrRegisteredCandidateIds]
            }
          }
        },
        {
          $match:{
            has_ids:true
          }
        }
      ],function(err,candidateDetails){
        QuestionModel.aggregate([
          {
            $project:{
              title:1,
              problemDescription:1,
              difficulty:1,
              'has_ids':{
                $in:['$_id',arrQuestionIds]
              }
            }
          },
          {
            $match:{
              has_ids:true
            }
          }
        ],function(err,questionsInTest){
          res.status(200).json({test_Detail:TestData,candidates: candidateDetails,questions:questionsInTest});
        });
      });
    });

  },

  register: async (req, res) => {
    let userId = req.user.id;
    let testId = req.params.testId;
    if (req.user.type == 'developer') {
      let registerdResult = await TestModel.updateOne({ _id: testId },
        { $addToSet: { registeredCandidates: userId } });

      if (registerdResult.nModified) {
        return res.status(200).json({ message: 'registered' });
      }
      else {
        return res.status(400).json({ message: 'already registered or invalid test' });
      };
    }
    res.status(404).json({ message: 'You cannot register' });
  },


};