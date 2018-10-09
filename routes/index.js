const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Test Page, Server is running' });
});

router.get('/poc', function(req, res, next) {
  let requestsArray = [{Singer: "Mark Collier & James Tanner", Title: "1000 Miles", Artist: "Vanessa Carlton"}]
  res.render('poc', { reqJson: requestsArray[0] });
});

module.exports = router;