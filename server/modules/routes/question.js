const router = require('express-promise-router')();
const { validateBody, schemas } = require('../helpers/routeHelpers');
const passport = require('passport');
const passportConf = require('../../config/passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const QuestionController = require('../controllers/question');

router.route('/').post(passportJWT,validateBody(schemas.questionSchema), QuestionController.insert);
router.route('/').get(passportJWT, QuestionController.get);

module.exports = router;

function bodyLogr(req, res, next) {
  next();
}