const express = require('express');
const router = express.Router();
const QueryRequestsCollection = require('../src/queryRequestsCollection');
const queryRequestsCollection = new QueryRequestsCollection();

/* GET requests listing. */
router.get('/', async function(req, res, next) {
  const requestsArray = await queryRequestsCollection.getRequests();
  let pending = [];
  let completed = []; 

  for(let req of requestsArray) {
    if ( req.State ) {
      completed.push(req);
    } else {
      pending.push(req);
    }
  }

  pending.sort(function(a,b){
    if ( a.DateTime < b.DateTime ) {
      return -1;
    }

    if ( a.DateTime > b.DateTime ) {
      return 1;
    }

    return 0;
  });

  completed.sort(function(a,b){
    if ( a.CompletedDateTime < b.CompletedDateTime ) {
      return -1;
    }

    if ( a.CompletedDateTime > b.CompletedDateTime ) {
      return 1;
    }

    return 0;
  });

  res.render('requests', { pendingData: pending, completedData: completed } );
});

router.post('/completed', async function(req, res){
  const body = req.body;
  res.set('Content-Type', 'application/json');
  queryRequestsCollection.requestCompleted(body)
  .then(obj => {
    if ( obj.Status === "success" ) {
      res.status(200);
    } else {
      res.status(500);
    }

    res.send( JSON.stringify( obj ) ) ;
  })
  .catch(err => {
    console.log(err);
    res.status(503);
    res.send( "error: " + err ) ;
  })

});


router.post('/new-request', async function(req, res){
  const body = req.body;

  let obj = await queryRequestsCollection.addRequest(body);

  if ( obj.Status === "success" ) {
    res.status(201);
  } else {
    res.status(500);
  }

  res.set('Content-Type', 'application/json');
  res.send( JSON.stringify( obj ) ) ;

});

router.get('/new-request/thank-you/:guid', async function(req, res, next){
  const requestsArray = await queryRequestsCollection.getRequest( req.params.guid );

  res.render('thank-you', { reqJson: requestsArray[0] } );
});

module.exports = router;