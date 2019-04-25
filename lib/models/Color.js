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
    required: true,
    minlength: 0,
    maxlength: 255
  },
  green: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 255
  },
  blue: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 255
  }
});

module.exports = mongoose.model('Color', colorSchema);
