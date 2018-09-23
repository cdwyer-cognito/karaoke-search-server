//import { findbyTitle, findbyArtist, findinAll, artistStartsWith, titleStartsWith } from '../src/querySongsCollection';
//import { addRequest } from '../src/queryRequestsCollection';

const express = require('express');
const router = express.Router();

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

//browse by artist with search param
router.get('/browse/byartist/find/:search', function(req, res, next) {
    let search = req.params.search;
    let dbresults = [];
    if (search === num ) {
      //  dbresults = artistStartsWith("\W");
    } else {
      //  dbresults = artistStartsWith(search);
    }
});

//browse by title with search param
router.get('/browse/bytitle/find/:search', function(req, res, next) {
    let search = req.params.search;
    let dbresults =[];
    if (search === "num" ) {
      //  dbresults = titleStartsWith("\W");
    } else {
      //  dbresults = titleStartsWith(search);
    }
});


router.get('/find/:field/:search', function(req, res, next) {
    const field = req.params.field;
    const search = decodeURI( req.params.search );
    let dbresults = [];
    console.log("Searching for " + search + " in field " + field );

    if ( field === "all"){
      // dbresults = findinAll(search); 
    } else if ( field === "artist" ) {
      //  dbresults = findbyArtist(search);
    } else if ( field === "title" ) {
      //  dbresults = findbyTitle(search);
    }
    

});

router.get('/results', function(req, res, next) {
    res.render( 'results', { field: field, search: search } );
});

module.exports = router;