const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/keys');
const UserModel = require('../model/users');


signToken = user => {
  return JWT.sign({
    iss: 'crackerrank',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
};

module.exports = {
  signUp: async (req, res, next) => {
    const user = req.body;
    //check if there is a user with the same email
    const foundUser = await UserModel.findOne({ 'local.email': user.email });
    
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already taken' });
    }
    
    //create a new user
    let newUser;
    if(user.type === 'developer') {
      newUser = new UserModel({
        id: Object,
        method: 'local',
        local: {
          email: user.email,
          password: user.password
        },
        name: user.name,
        mobile: user.mobile,
        type: user.type
      });
    }
    
    if(user.type === 'business') {
      newUser = new UserModel({
        method: 'local',
        local: {
          email: user.email,
          password: user.password
        },
        name: user.name,
        mobile: user.mobile,
        companyName: user.companyName,
        address: user.address
      });  
    }    
    
    await newUser.save();
    
    // Respond with status
    res.status(200).json({ status: 'Successfully Created' });
  },
  
  signIn: async (req, res, next) => {
    const user = req.user;    
    const token = signToken(user);

    res.status(200).json({ 
      token: token, 
      user: {
        name: user.name, 
        type: user.type,
        email: (user.type === 'developer') ? user.local.email: user.google.email,
        profile: (user.type === 'developer') ? user.userProfileDev : user.userProfileRec,
      } 
    });
  },
  
  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
  
  secret: async (req, res, next) => {
    res.json({ secret: 'secret resource' });
  }
};