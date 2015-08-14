var mongoose = require('../db/database');

var Product = mongoose.model('Product', { 
  name: String, 
  price: String
});

module.exports = Product;
