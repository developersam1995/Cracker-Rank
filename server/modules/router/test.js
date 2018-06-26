const express = require('express');
const router = express.Router();
const test = require('../controllers/test');

router.get('/', (req, res) => {
  test.showTest().then((result, err) => {
    if (err) {
      res.status(503).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

router.post('/', (req, res) => {
  res.status(200).send(req.params);
  test.settest(req.body).then((result, err) => {
    if (err) {
      res.status(504).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});


module.exports = router;