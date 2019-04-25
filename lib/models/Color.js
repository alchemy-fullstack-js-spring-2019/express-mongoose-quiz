const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
  name: {
    required: true,
    type: String
    },
  hex: {
    required: true,
    type: String
    },
  red: {
    required: true,
    type: Number,
    minLength: 0,
    maxLength: 255
    },
  green: {
    required: true,
    type: Number,
    minLength: 0,
    maxLength: 255
    },
  blue: {
    required: true,
    type: Number,
    minLength: 0,
    maxLength: 255
  }
});

module.exports = mongoose.model('Color', colorSchema);
