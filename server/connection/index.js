const mongoose = require('mongoose');
// mongoose.connect('mongodb://crackerrank:cracker@123rank@ds261570.mlab.com:61570/crackerrank');
mongoose.connect('mongodb://localhost:27017/crackerrank');

mongoose.connection.on('open', ()=> {
  // eslint-disable-next-line
  console.log('Connected with database');
});

module.exports = {
  mongoose
};