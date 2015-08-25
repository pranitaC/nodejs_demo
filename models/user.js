var mongoose = require('../db/database');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');


var User = new Schema({ 
  name: String, 
  phone: String, 
  email: String, 
  age: String,
  gender: String,
  username: String,
  password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User); 
