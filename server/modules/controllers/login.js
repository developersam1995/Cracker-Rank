
const UserModel = require('../model/user');
const encryption = require('../../config/Enctyption');

const validate = (params) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({email: params.email}, (err, user) => {
      if (err) {
        return reject({status: 500, message: 'Unable to connect.'});
      } else {
        if (user) {
          if(encryption.decryptPassword(user.password) === params.password) {
            return resolve({status: 200, message: 'Login Successfully.', user: user});
          } else {
            return resolve({status:401, message: 'Please enter valid credential'});
          }
        } else {
          return resolve({status:200, message: 'Please enter valid credential'});
        }
      }
    })
  })
}

module.exports = {validate};