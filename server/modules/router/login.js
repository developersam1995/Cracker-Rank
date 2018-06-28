const express = module.require('express');
const router = express.Router();
const login = require('../controllers/login');
const Cookies = require('cookies');

router.post('/', (req, res) => {
  // console.log(req.body);
  // console.log(req.session);
  // console.log(req.cookies);
  login.validate(req.body).then((result) => {
    let cookie = new Cookies(req, res, {keys: 'abcd'});
    router.cookie('name','tes');
    res.status(result.status).json({ message: result.message, user: result.user });
  }).catch(err => {
    res.status(503).json({ messages: err });
  });
});

module.exports = router;