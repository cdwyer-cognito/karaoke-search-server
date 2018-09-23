//import { test } from '../src/queryRequestsCollection';

const express = require('express');
const router = express.Router();

/* GET requests listing. */
router.get('/', function(req, res, next) {
  res.send('TBD Requests');
});

router.get('/test', function(req, res, next) {
  res.send(test());
});

module.exports = router;