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
const getquestions = () => {
  return new Promise((resolve, reject) => {
    questionModel.aggregate([{
      $group: {
        _id: { _id: '$_id', title: '$title' }
      }
    }, {
      $project: {
        _id: 0,
        id: '$_id._id',
        title: '$_id.title'
      }
    }], (err, result) => {
      resolve(result);
    });

  });
};

const insert = (params) => {
  return new Promise((resolve, reject)=>{
    questionModel.insertMany(params, (err, result)=>{
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
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
  update,
  getquestions
};