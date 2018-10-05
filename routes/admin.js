const express = require('express');
const router = express.Router();
const LoadXML = require('../src/loadXML');
const loadXML = new LoadXML();
const QueryRequestsCollection = require('../src/queryRequestsCollection');
const queryRequestsCollection = new QueryRequestsCollection();
const ip = require('ip');

router.get('/', async function(req, res, next) {
  res.render('admin', { });
});

router.post('/load-library', async function(req, res, next) {
  console.log("Loading Library");
  let serverIp = ip.address();
  let requestIp = req.body.localIp;

  let message 
  if (serverIp === requestIp ) {
    message = await loadXML.loadXML();
    console.log("Retuening 200");
    res.status(200).send(message);
  } else {
    message = "failed - request did not come from server ip";
    console.log("Returning 401");
    res.status(401).send(message);
  }

});

router.post('/drop-requests', async function(req, res) {
  console.log("Loading Library");
  let serverIp = ip.address();
  let requestIp = req.body.localIp;
  console.log("requestIp " + requestIp);
  console.log("serverIp " + serverIp);

  let message = "failed"

  if (serverIp === requestIp ) {
    message = await queryRequestsCollection.clearRequestsCollection();
    console.log("Retuening 200");
    res.status(200).send(message);
  } else {
    message = "failed - request did not come from server ip";
    console.log("Returning 401");
    res.status(401).send(message);
  }
});


module.exports = router;