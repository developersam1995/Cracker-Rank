const questionModel = require('../model/question');
const BusinessModel = require('../model/business');

const get = (params) => {
  return new Promise((resolve, reject) => {
    BusinessModel.findById({ _id: params }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getAll = (params) => {
  return new Promise((resolve, reject) => {
    BusinessModel.find({}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insert = (params) => {
  return new Promise((resolve, reject)=>{
    BusinessModel.insertMany(params, (err, result)=>{
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  insert,
  get,
  getAll
}
// const questionModel = require('../model/question');
// const express = require('express');
// const getall = () => {
//   return new Promise((resolve, reject) => {
//     questionModel.find({}, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
        
//       }
//     });
//   });
// };
