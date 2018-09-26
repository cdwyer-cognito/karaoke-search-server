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

router.post('/completed', function(req, res, next){
  const body = req.body;

  let status = queryRequestsCollection.requestCompleted(body);

  res.send(status);
});


router.post('/new-request', function(req, res, next){
  const body = req.body;

  let status = queryRequestsCollection.addRequest(body);

  res.send(status);

});

router.get('/new-request/thank-you', function(req, res, next){

  res.render('thank-you', {} );
});

module.exports = router;