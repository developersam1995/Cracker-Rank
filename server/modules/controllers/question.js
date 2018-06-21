const questionModel = require('../model/question');
const express = require('express');

const get = (params) => {
  return new Promise((resolve, reject) => {
    questionModel.findById({_id: params}, (err, result)=>{
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getall = () => {
  return new Promise((resolve, reject) => {
    questionModel.find({}, (err, result)=>{
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insert = (params) => {
  console.log(params);

  const question = new questionModel({
    title: params.title,
    problem: params.problem,
    inputFormat: params.inputFormat,
    outputFormat: params.outputFormat,
    note: params.note,
    sampleTestcase: [{
      input: params.sampleTestcaseInput,
      output: params.sampleTestcaseOutput
    }],
    mainTestcase: [{
      input: params.mainTestcaseInput,
      output: params.mainTestcaseOutput
    }],
    explanation: params.explanation,
    difficulty: params.difficulty,
    maxScore: params.maxScore,
    author: params.author
  });

  return new Promise((resolve, reject)=>{
    question.save(error=>{
      if(error) {
        reject(error);
      } else {
        resolve('Inserted Successfully.');
      }
    });
    // questionModel.insertMany(params, (err, result)=>{
    //   if(err) {
    //     reject(err);
    //   } else {
    //     resolve(result);
    //   }
    // });
  });
};

const update = () => {
  return new Promise((resolve, reject)=>{
    resolve('updated');
  });
};

module.exports = {
  insert, 
  get,
  getall,
  update
};