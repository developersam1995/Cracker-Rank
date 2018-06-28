const questionModel = require('../model/question');
const addTest = require('../model/test');
const express = require('express');

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
  showTest

};



