const questionModel = require('../model/question');
const addTest = require('../model/business-test');
const express = require('express');
var ObjectId = require('mongodb').ObjectID;

const settest = (params) => {
  return new Promise((resolve, reject) => {
    addTest.insertMany(params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });

  });
};

const getTest = (params) =>{
  return new Promise(function(resolve,reject){
    addTest.aggregate([   
      {
        $project:{
          _id:1,
          questionID:1
        }
      },
      {
        $match:{
          _id:ObjectId(params)
        }
      }
    ],function(error,data){
      if(error){
        reject(error);
      }else{
        resolve(data);
      }
    });
  });
};

const showTest = () => {
  return new Promise((resolve, reject) => {
    addTest.aggregate([{
      $group: {
        _id: {
          title: '$title',
          date: '$startDate',
          questions: '$questionID'
        },
        numberOfquestions: { $sum: '$questionID' }
      }

    },{
      $project:{
        _id:0,
        title:'$_id.title',
        date:'$_id.date',
        questions:{ $size: '$_id.questions' }

      }
    }], (err, result) => {
      resolve(result);
    });


  });
};
module.exports = {

  settest,
  showTest,
  getTest
};



