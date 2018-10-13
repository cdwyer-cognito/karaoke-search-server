const express = require('express');
const router = express.Router();
const LoadXML = require('../src/loadXML');
const loadXML = new LoadXML();
const QueryRequestsCollection = require('../src/queryRequestsCollection');
const queryRequestsCollection = new QueryRequestsCollection();
const ip = require('ip');
const remoteClients = {};

router.get('/', async function( req, res ) {
  res.render('admin', {});
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

router.post('/ping', function(req, res){
  let clientIp = req.body.ip;
  let dateTime = req.body.dateTime;

  remoteClients[ clientIp ] = new Date(dateTime);

  res.header({
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json; charset=utf-8"
  });
  res.status(200).send('{}');
});

router.get('/clientsState', function(req, res ) {
  const jsonObj = Object.keys(remoteClients);
  let clientsArray = [];
  let dt;
  let timeDifference;
  let connectionState;
  const dtNow = new Date();

  if (jsonObj.length > 0 ) {
    jsonObj.forEach(function(ip) {
      dt = remoteClients[ip];
      timeDifference = dtNow - dt;

      if ( timeDifference <= 30000 ) {
        // connected
        connectionState = 1;
      } else if ( ( timeDifference > 30000 ) && ( timeDifference <= 600000) ) {
        // warining
        connectionState = 2;
      } else {
        // disconnected
        connectionState = 3
      }

      clientsArray.push( [ ip, connectionState, dt ] );
    });
  }

  res.header({
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json; charset=utf-8"
  });

  res.status(200).send( JSON.stringify( { clients: clientsArray } ) );
  
});


module.exports = router;