const express = require('express');
const router = express.Router();
const business = require('../controllers/business');

router.get('/', (req, res)=>{
  let query = req.query.query;

  if (query === 'all') {
    business.getAll(req.query.query).then((result, err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(result);
      }
    });
  } else if (query != null) {
    business.get(req.query.query).then((result, err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(result);
      }
    });
  }
});

router.post('/', (req, res)=>{
  business.insert(req.body).then((result, err) => {
    if(err) {
      res.status(503).send(err);
    } else {
      res.status(201).send(result);
    }
  })
});

module.exports = router;