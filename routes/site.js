var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('site/index');
});

/* GET page1. */
router.get('/page1', function(req, res, next) {
  res.render('site/page1');
});

/* GET page2. */
router.get('/page2', function(req, res, next) {
  res.render('site/page2');
});


module.exports = router;
