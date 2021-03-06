const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../../config/passport');
const { validateBody, schemas } = require('../helpers/routeHelpers');

const passportLocal = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
// const passportGoogle = passport.authenticate('googleToken', { session: false });
const UsersController = require('../controllers/users');

router.route('/signup').post(validateBody(schemas.userSchema), UsersController.signUp);

router.route('/signin').post(validateBody(schemas.localLoginSchema), passportLocal, UsersController.signIn);

router.route('/')
  .get(passportJWT,UsersController.getUserDet);

router.route('/profile')
  .get(passportJWT,UsersController.getProfile)
  .put(passportJWT,UsersController.updateProfile);

router.route('/google').get( passport.authenticate('google', { 
  scope:['profile']
}));

router.route('/google/redirect').get(passport.authenticate('google'),(req,res)=>{
  res.set({ 'content-type': 'text/html; charset=utf-8' });
  res.end(popupTools.popupResponse(req.user));
});

router.route('/')
  .get(passportJWT,UsersController.getUserDet);

module.exports = router;