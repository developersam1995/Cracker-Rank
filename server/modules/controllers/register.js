const BusinessModel = require('../model/business');
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
  return new Promise((resolve, reject) => {
    UserModel.find({ email: params.email }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length) {
          resolve({status:200, message: 'Email is already taken'});
        } else {
          console.log('insert many ', result);
          UserModel.insertMany(params, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve({status:201, message: 'Registered Successfully'});
            }
          });
        }
      }
    });
  });
};

module.exports = {
  insert,
  get,
  getAll
};