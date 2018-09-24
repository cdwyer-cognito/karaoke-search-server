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

  if ( field === "all"){

    dbresults = await querySongsCollection.findinAll(search); 

  } else if ( field === "artist" ) {

    if ( typeofsearch === "startswith" ) {
      dbresults = await querySongsCollection.artistStartsWith( ( search === "num" ? "\W" : search ) );
    } else {
      dbresults = await querySongsCollection.findbyArtist(search);
    }

  } else if ( field === "title" ) {

    if ( typeofsearch === "startswith" ) {
      dbresults = await querySongsCollection.titleStartsWith( ( search === "num" ? "\W" : search ) );
    } else {
      dbresults = await querySongsCollection.findbyTitle(search);
    }

  }


  //res.render( 'results', { field: field, typeofsearch: typeofsearch, search: search } );
  res.send(dbresults);
});

module.exports = router;