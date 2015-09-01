var mongoose = require('../db/database');
var Schema = mongoose.Schema;

var Product = new Schema({ 
  name: String, 
  price: Number,
  image_url: String
});

module.exports = mongoose.model('Product', Product);;
