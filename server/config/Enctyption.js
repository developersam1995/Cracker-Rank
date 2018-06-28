const Cryptr = require('cryptr');
const keys = require('./keys');

const cryptr = new Cryptr(keys.password.privateKey);

const encryptPassword = (password) => cryptr.encrypt(password);
const decryptPassword = (hashPassword) => cryptr.decrypt(hashPassword)

module.exports = {
  encryptPassword, 
  decryptPassword
}