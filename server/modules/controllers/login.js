
const UserModel = require('../model/user');
const encryption = require('../../config/Enctyption');

const validate = (params) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    UserModel.findOne({ username: params.username }, (err, user) => {
      if (err) {
        return reject({ status: 500, message: 'Unable to connect.' });
      } else {
        if (user) {
          if (encryption.decryptPassword(user.password) === params.password) {
            return resolve({
              status: 200, message: 'Login Successfully.',
              user: { 
                name: user.name,
                username: user.username,
                type: user.type,                
              }
            });
          } else {
            return resolve({ status: 401, message: 'Please enter valid credential' });
          }
        } else {
          return resolve({ status: 200, message: 'Please enter valid credential' });
        }
      }
    });
  });
};

module.exports = { validate };