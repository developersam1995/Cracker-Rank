const mongoose = require('mongoose');
const id = 'crackerrank'; //contact with admin for id and password
const password = 'crackerrank123';
mongoose.connect(`mongodb://${id}:${password}@ds261570.mlab.com:61570/crackerrank`);
// mongoose.connect('mongodb://localhost:27017/crackerrank');

mongoose.connection.on('open', ()=> {
  // eslint-disable-next-line
  console.log('Connected with database');
});

module.exports = {
  mongoose
};