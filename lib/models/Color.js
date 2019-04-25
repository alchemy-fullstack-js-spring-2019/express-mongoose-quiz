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
    min: 0,
    max: 255,
    required: true
  },
  green: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  },
  blue: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  }
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
