const mongoose = require('mongoose');

const ColorsSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  hexValue: {
    type: String,
    required: true
  },
  red: {
    type: Number,
    required: true,
    maxlength: 255,
    minlength: 0
  },
  green: {
    type: Number,
    required: true,
    maxlength: 255,
    minlength: 0
  },
  blue: {
    type: Number,
    required: true,
    maxlength: 255,
    minlength: 0
  },
}); 

module.exports = mongoose.model('Colors', ColorsSchema);

