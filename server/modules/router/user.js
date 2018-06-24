const express = module.require('express');
const router = express.Router();
const user = require('../controllers/user');

router.post('/', (req, res)=>{
  user.insert(req.body).then((result, err)=>{
    if(err) {
      res.status(503).send(err);
    } else {
      res.status(201).send(result);
    }
  })
});

router.get('/', (req, res)=>{

  let query = req.query.query;

  if (query === 'all') {
    user.getAll(req.query.query).then((result, err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(result);
      }
    });
  } else if (query != null) {
    user.get(req.query.query).then((result, err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(202).send(result);
      }
    });
  }
});




module.exports = router;