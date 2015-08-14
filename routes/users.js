var express = require('express');
var router = express.Router();
var User = require('../models/user');

function showUsers(res, err, usersList){
  res.render('users/index', { records: usersList });
}


/* GET users index page. */
router.get('/users', function(req, res, next) {
  User.find({}, function(err, users){
    showUsers(res, err, users);
  });
});


router.get('/users/new', function(req, res, next){
  res.render('users/new', { user: new User() });
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
      res.render('users/new');
    } else {
      console.log('User created...');
      res.redirect('/users/'+user1._id);
    }
  });
});

router.put('/users/:id', function(req, res){
  console.log(req.body.user);
  var user = new User(req.body.user);
  user._id = req.params['id'];
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
      res.render('users/edit', { user: user });
    }
  });
});


module.exports = router;
