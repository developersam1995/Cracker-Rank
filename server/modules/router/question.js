const express = require('express');
const router = express.Router();
const question = require('../controllers/question');

router.post('/', (req, res) => {
  question.insert(req.body).then((result, err) => {
    if(err) {
      res.status(503).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

router.get('/', (req, res) => {
  let query = req.query.query;
  let promise;
  if(query === 'all') {
    question.getall(req.query.query).then((result, err) => {
      if(err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(result);
      }
    });
  } else if(query === 'random') {
    question.getall(req.query.query).then((result, err) => {
      if(err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(result[Math.floor(Math.random() * result.length)]);
      }
    });
  } else if(query != null) {
    question.get(req.query.query).then((result, err) => {
      if(err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(result);
      }
    });
  }
});

router.put('/', (req, res) => {
  question.update().then((result, err) => {
    console.log('put request');
    res.status(200).send(result);
  });
});

module.exports = router;