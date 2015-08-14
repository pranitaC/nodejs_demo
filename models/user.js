var mongoose = require('../db/database');

var User = mongoose.model('User', { 
  name: String, 
  email: String, 
  phone: String, 
  age: String,
  gender: String
});

module.exports = User;
