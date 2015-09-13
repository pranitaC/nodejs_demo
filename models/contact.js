var mongoose = require('../db/database');
var Schema = mongoose.Schema;

var Contact = new Schema({ 
  name: { type: String, required: "{PATH} is required" }, 
  email: { type: String, required: "{PATH} is required" },
  comment: { type: String, required: "{PATH} is required" }
});

module.exports = mongoose.model('Contact', Contact);;
