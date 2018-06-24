const questionModel = require('../model/question');
const UserModel = require('../model/user');

const get = (params) => {
  return new Promise((resolve, reject) => {
    UserModel.findById({ _id: params }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    UserModel.find({}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const insert = (params) => {
  console.log(params)
  return new Promise((resolve, reject)=>{
    UserModel.insertMany(params, (err, result)=>{
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