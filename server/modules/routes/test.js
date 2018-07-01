const router = require('express-promise-router')();
const { validateBody, schemas } = require('../helpers/routeHelpers');
const passport = require('passport');
const passportConf = require('../../config/passport');
const passportJWT = passport.authenticate('jwt', { session: false });
const TestsController = require('../controllers/test');

router.route('/').post(passportJWT, validateBody(schemas.testSchema), TestsController.insert);
router.route('/').get(passportJWT, TestsController.get);
    
module.exports = router;