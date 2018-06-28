const express = module.require('express');
const router = express.Router();
const register = require('../controllers/register');

router.post('/', (req, res) => {
  register.insert(req.body)
    .then((result) => {
      res.status(result.status).json({ msg: result.message });
    }).catch(err => {
      res.status(503).json({ msg: err });
    });
});

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/google', authCheck, (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.status(200).send('req');
});

router.get('/', (req, res) => {

  let query = req.query.query;

  if (query === 'all') {
    register.getAll(req.query.query).then((result, err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(result);
      }
    });
  } else if (query != null) {
    register.get(req.query.query).then((result, err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(result);
      }
    });
  }
});

module.exports = router;