var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

function renderContactPage(req, res, contact, err){
  var is_ajax_request = req.xhr;
  if(is_ajax_request) {
    res.json({
      data: req.body.contact,
      err: err
    })
  } else {
    res.render('site/contact', {
      show_form: false
    });
  }
}
/* GET home */
router.get('/', function(req, res, next) {
  res.render('site/index');
});

/* GET contact-us. */
router.get('/contact-us', function(req, res, next) {
  res.render('site/contact', {
    show_form: true
  });
});

/* POST contact-us */
router.post('/contact-us', function(req, res, next) {
  for(var i = 0;  i < 100000; i++) {
    console.log(i);
  }
  var contact = new Contact(req.body.contact);
  contact.save(function (err) {
    renderContactPage(req, res, contact, err);
  });
});

/* GET gallery */
router.get('/gallery', function(req, res, next) {
  res.render('site/gallery');
});

router.get('/demo', function(req, res, next) {
  res.render('site/demo');
});


module.exports = router;
