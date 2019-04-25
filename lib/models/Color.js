const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  hex: {
    type: String,
    required: true,
    match: /^#(\d|[a-f]){6}$/i
  },
  r: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  g: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  b: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
});

module.exports = mongoose.model('Color', colorSchema);
