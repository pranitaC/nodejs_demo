var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');
var multer = require('multer');
var upload = multer({dest: 'public/uploads/users'}); 

function showUsers(res, err, usersList){
  res.render('users/index', { records: usersList });
}

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  res.render('users/login', { message: req.flash() });
});

router.post('/login', passport.authenticate(
    'local', { 
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true 
    }
  )
);

router.get('/register', function(req, res) {
  res.render('users/signup', { message: {} });
});

router.post('/register', function(req, res) {
  var user = new User({ 
    username : req.body.username, 
    name: req.body.name, 
    email: req.body.email 
  });
  User.register(user, req.body.password, function(err, user) {
    if (err) {
      return res.render("users/signup", { 
        message: { error: "Sorry. That username already exists. Try again." }
      });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});



/* GET users index page. */
router.get('/users', function(req, res, next) {
  User.find({}, function(err, users){
    showUsers(res, err, users);
  });
});


router.get('/users/new', function(req, res, next){
  res.render('users/new', { user: new User(), error: null });
});

router.post('/users',upload.single('photo'), function(req, res){
  console.log(req.file);
  if(req.file) {
    req.body.user.image_url = "/uploads/users/"+req.file.filename;
  }
  var user1 = new User(req.body.user);
  user1.save(function (err) {
    if (err){
      console.log(err);
      res.render('users/new', { user: user1, error: err });
    } else {
      console.log('User created...');
      res.redirect('/users/'+user1._id);
    }
  });
});

router.delete('/users/:id', function(req, res, next){
  User.findOne({ _id: req.params['id'] }, function(err, user){
    if(err) {
      res.redirect('/users');
    } else {
      user.remove(function(err, user){
        if (err) {
          res.redirect('/users');
        } else {
          //Returning success messages saying it was deleted
          console.log('DELETE removed User: ' + user.name);
          res.redirect('/users');
        }
      });
    }
  });
});

router.post('/users', function(req, res){
  console.log(req.body.user);
  var user1 = new User(req.body.user);
  user1.save(function (err) {
    if (err){
      console.log(err);
      res.render('users/new', { user: user1, error: err});
    } else {
      console.log('User created...');
      res.redirect('/users/'+user1._id);
    }
  });
});

router.put('/users/:id', upload.single('photo'), function(req, res){
  console.log(req.file);
  var user = new User(req.body.user);
  user._id = req.params['id'];
  if(req.file){
    req.body.user.image_url = "/uploads/users/"+req.file.filename;
  }
  User.update({ _id: req.params['id'] }, req.body.user, {}, function (err, raw) {
    if (err){
      console.log(err);
      res.render('users/edit', { user: user });
    } else {
      console.log('User updated...');
      console.log(raw);
      res.redirect('/users/'+user._id);
    }
  });
});


router.get('/users/:id', function(req, res, next){
  User.findOne({ _id: req.params['id'] }, function(err, user){
    if(err) {
      res.redirect('/users');
    } else {
      res.render('users/show', { user: user });
    }
  });
});

router.get('/users/:id/edit', function(req, res, next){
  User.findOne({ _id: req.params['id'] }, function(err, user){
    if(err) {
      res.redirect('/users');
    } else {
      res.render('users/edit', { user: user, error: null });
    }
  });
});


module.exports = router;
