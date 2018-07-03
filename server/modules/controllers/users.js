const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/keys');
const UserModel = require('../model/users');
const QuestionModel = require('../model/question');
const TestModel = require('../model/test');
const ObjectId = require('mongodb').ObjectId;


signToken = user => {
  return JWT.sign({
    iss: 'crackerrank',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
};

module.exports = {
  signUp: async (req, res, next) => {
    const user = req.body;
    //check if there is a user with the same email
    const foundUser = await UserModel.findOne({ 'local.email': user.email });
    
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already taken' });
    }
    
    //create a new user
    let newUser;
    if(user.type === 'developer') {
      newUser = new UserModel({
        id: Object,
        method: 'local',
        local: {
          email: user.email,
          password: user.password
        },
        name: user.name,
        mobile: user.mobile,
        type: user.type
      });
    }
    
    if(user.type === 'business') {
      newUser = new UserModel({
        method: 'local',
        local: {
          email: user.email,
          password: user.password
        },
        name: user.name,
        mobile: user.mobile,
        companyName: user.companyName,
        address: user.address,
        type: user.type
      });  
    }    
    
    await newUser.save();
    
    // Respond with status
    res.status(201).json({ status: 'Successfully Created' });
  },
  
  signIn: async (req, res, next) => {
    const user = req.user;    
    const token = signToken(user);

    res.status(200).json({ 
      token: token, 
      user: {
        name: user.name, 
        type: user.type,
        email: (user.type === 'developer') ? user.local.email: user.google.email,
        profile: (user.type === 'developer') ? user.userProfileDev : user.userProfileRec,
      } 
    });
  },
  
  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  
  getProfile: async (req, res, next) => {
    if (req.user.type == 'developer') {
      return res.json(req.user.userProfileDev);
    }
    if(req.user.type == 'business') {
      return res.json(req.user.userProfileRec);
    }
    res.status(404).json( {error:'user not found'} );
  }, 

  updateProfile: async (req, res, next) => {
    if (req.user.type == 'developer') {
      if(req.body.practicedQn) {
        let update = await UserModel.updateOne({_id:req.user.id},
          {$addToSet:{'userProfileDev.practicedQuestions':req.body.practicedQn}});    
        return res.status(202).send({message:'successfully updated'});    
      }
      else if(req.body.test) {
        let update = await UserModel.updateOne({_id:req.user.id},
          {$addToSet:{'userProfileDev.tests':req.body.test}}); 
        return res.status(202).send({message:'successfully updated'});         
      }
      else {
        return res.status(422).send('Invalid request');
      }
    }
    if(req.user.type == 'business') {
      if(req.body.test) {
        let update = await UserModel.updateOne({_id:req.user.id},
          {$addToSet:{'userProfileRec.tests':req.body.test}});   
        return res.status(202).send({message:'successfully updated'});    
      }
      else {
        return res.status(422).send('Invalid request');
      }
    }
    res.status(404).json( {error:'user not found'} );
  },
  getUserDet: async (req, res, next) => {
    let userId = req.user.id;
    UserModel.aggregate([
      {
        $match: {
          _id: ObjectId(userId)
        }
      },
      {
        $project: {
          email: 1,
          name: 1,
          mobile: 1,
          address: 1,
          type: 1,
          userProfileRec: 1,
          userProfileDev: 1
        }
      }
    ], (err, userDet) => {
      if (err) {
        res.send(err);
      }

      let testIds = userDet[0].userProfileDev.tests.map((val) => ObjectId(val));
      let practicedQuestionsIds = userDet[0].userProfileDev.practicedQuestions.map((val) => ObjectId(val));

      let strDate = new Date(), dd, mm = strDate.getMonth() + 1;
      dd = (strDate.getDate() < 10 ? '0' + strDate.getDate() : strDate.getDate());
      mm = (mm < 10 ? '0' + mm : mm);

      let todaysDate = strDate.getFullYear() + '-' + mm + '-' + dd;
      //To Get Test List
      TestModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'companyId',
            foreignField: '_id',
            as: 'company_details'
          }
        },
        {
          $project: {
            title: 1,
            description: 1,
            startDate: 1,
            endDate: 1,
            company_details: 1,
            candidates: {
              $filter: {
                input: '$candidates',
                as: 'candidates',
                cond: { $eq: ['$$candidates.id',userId] }
              }
            },
            'test_taken': {
              $in: ['$_id', testIds]
            }
          }
        },
        {
          $match: {
            test_taken: true
          }
        },
        {
          $sort: {
            startDate: 1
          }
        }
      ], (err, testDet) => {
        if (err) {
          res.send(err);
        }
        //To Get User Practiced Question List
        QuestionModel.aggregate([
          {
            $project: {
              title: 1,
              'practiced': {
                $in: ['$_id', practicedQuestionsIds]
              }
            }
          },
          {
            $match:{
              practiced:true
            }
          }
        ], (err, PracticeQuestionList) => {

          if (err) {
            res.send(err);
          } else {
            res.status(201).send({
              userDetails: userDet,
              allTestList: testDet, //with Developer User test took data appended 
              PracticeQuestionList: PracticeQuestionList //with Developer User practice took data appended 
            });
          }
        });
      });
    });
  }
};