const BusinessModel = require('../model/business');
const UserModel = require('../model/user');
const encryption = require('../../config/Enctyption');


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

// const insert = (params) => {
//   return new Promise((resolve, reject) => {
//     UserModel.find({ email: params.email }, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         if (result.length) {
//           resolve({status:200, message: 'Email is already taken'});
//         } else {
//           console.log('insert many ', result);
//           UserModel.insertMany(params, (err, result) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve({status:201, message: 'Registered Successfully'});
//             }
//           });
//         }
//       }
//     });
//   });
// };

const insert = (params) => {
  console.log(params);

  return new Promise((resolve, reject) => {
    UserModel.findOne({ username: params.username }, (err, user) => {
      if (err) {
        reject({status: 500, message: 'Unable to connect.'});
      } else {
        if (user) {
          resolve({status:200, message: 'Email is already taken.'});
        } else {          
          if(params.type == 'developer') {
            UserModel.insertMany({
              name: params.name,
              username: params.username,
              mobile: params.mobile,
              password: encryption.encryptPassword(params.password),
              type: params.type
            }).then( (err, user) => {
              resolve({status: 201, message: 'Successfully Registered.'});
            }).catch(err=>{
              console.log(err);
            });
          }
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