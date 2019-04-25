const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  hex: {
    type: String,
    required: true
  },
  red: {
    type: Number,
    minlength: 0,
    maxlength: 255
  },
  green: {
    type: Number,
    minlength: 0,
    maxlength: 255
  },
  blue: {
    type: Number, 
    minlength: 0, 
    maxlength: 255
  }
});

const Color = mongoose.model('Color', colorSchema);
module.exports = Color;
