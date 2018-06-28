const express = require('express');
const router = express.Router();

const questionRouter = require('./question');
const testRouter = require('./test');

router.use('/question', questionRouter);
// router.use('/business', );

router.use('/test', testRouter);

router.get('/', (req, res) => {
  res.send('Welcome to CrackerRank API');
});