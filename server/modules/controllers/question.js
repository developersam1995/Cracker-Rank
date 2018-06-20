const questionModel = require('../model/question');
const express = require('express');

const get = () => {
  return new Promise((resolve, reject) => {
    resolve('done');
    // reject('err');
  });
};

const insert = (params) => {
  return new Promise((resolve, reject)=>{
    resolve('inserted', params);
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
  update
};