const express = require('express');
const router = express.Router();
const LoadXML = require('../src/loadXML');
const loadXML = new LoadXML();
const QueryRequestsCollection = require('../src/queryRequestsCollection');
const queryRequestsCollection = new QueryRequestsCollection();

router.get('/', async function(req, res, next) {
  res.render('admin', { });
});

router.post('/load-library', async function(req, res, next) {
  console.log("Loading Library");
  let message = await loadXML.loadXML();

  res.send(message);
});

router.post('/drop-requests', async function(req, res, next) {
  console.log("Loading Library");
  let message = await queryRequestsCollection.clearRequestsCollection();

  res.send(message);
});


module.exports = router;