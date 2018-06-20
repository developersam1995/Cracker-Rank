const express = require('express');
const router = express.Router();
const question = require('../controllers/question');

router.post('/', (req, res) => {
  console.log('post request');
  console.log(req.body);
  question.insert().then((result, err) => {
    console.log(result);
    res.status(200).send(result);
  });
});

router.get('/', (req, res) => {
  console.log('got request');
  question.get().then((result, err) => {
    res.send('got it');
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
});

router.put('/', (req, res) => {
  question.update().then((result, err) => {
    console.log(result);
    res.status(200).send(result);
  });
});

module.exports = router;