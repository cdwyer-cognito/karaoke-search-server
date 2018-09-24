//import { test } from '../src/queryRequestsCollection';

const express = require('express');
const router = express.Router();
const httpMessageParser = require('http-message-parser');
const QueryRequestsCollection = require('../src/queryRequestsCollection');
const queryRequestsCollection = new QueryRequestsCollection();

/* GET requests listing. */
router.get('/', function(req, res, next) {
  res.send('TBD Requests');
});

router.get('/test', function(req, res, next) {
  res.send(test());
});

router.post('/new-request', function(req, res, next){
  const message = httpMessageParser(req);
  const body = JSON.parse(message.body);

  let status = queryRequestsCollection.addRequest(body);

  res.send(status);

});

module.exports = router;