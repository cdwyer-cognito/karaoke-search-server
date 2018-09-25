const express = require('express');
const router = express.Router();
const QuerySongsCollection = require('../src/querySongsCollection');
const querySongsCollection = new QuerySongsCollection();

/* GET search listing. */
router.get('/', function(req, res, next) {
  res.send('TBD search');
});

/* UI Pages */
// main menu
router.get('/menu', function(req, res, next) {
    res.render('main-menu', { });
});

//browse by artist
router.get('/browse/byartist', function(req, res, next) {
    res.render('browse-grid', { title: "Artist" } );
});

//browse by title
router.get('/browse/bytitle', function(req, res, next) {
    res.render('browse-grid', { title: "Title" } );
});

// results
router.get('/results/:field/:typeofsearch/:search', async function(req, res, next) {
  const field = req.params.field; // especting: "artist", title", or "all"
  const typeofsearch = req.params.typeofsearch; // expecting: "startswith" or "contains"
  const search = decodeURI( req.params.search );
  let dbresults;
  let sortKey1 = "Artist";
  let sortKey2 = "Title";

  if ( field === "all"){

    dbresults = await querySongsCollection.findinAll(search); 

  } else if ( field === "artist" ) {

    if ( typeofsearch === "startswith" ) {
      dbresults = await querySongsCollection.artistStartsWith( ( search === "num" ? "[^a-zA-Z:]" : search ) );
    } else {
      dbresults = await querySongsCollection.findbyArtist(search);
    }

  } else if ( field === "title" ) {

    if ( typeofsearch === "startswith" ) {
      dbresults = await querySongsCollection.titleStartsWith( ( search === "num" ? "[^a-zA-Z:]" : search ) );
    } else {
      dbresults = await querySongsCollection.findbyTitle(search);
    }

    sortKey1 = "Title";
    sortKey2 = "Artist";

  }

  // sort results
  dbresults.sort(function(a,b){
    if ( a[sortKey1] < b[sortKey1] ) {
      return -1;
    }

    if ( a[sortKey1] > b[sortKey1] ) {
      return 1;
    }

    // If it's got this far the now sort by the second key
    if ( a[sortKey2] < b[sortKey2] ) {
      return -1;
    }

    if ( a[sortKey2] > b[sortKey2] ) {
      return 1;
    }
    
    return 0;
  });
 
  res.render('results', { data: dbresults, field: field });

});

router.get('/results/selected/:uid', async function(req, res, next) {
  const uid = req.params.uid;

  const data = await querySongsCollection.uid(uid);

  res.render('selected', { data: data });
  
});

module.exports = router;