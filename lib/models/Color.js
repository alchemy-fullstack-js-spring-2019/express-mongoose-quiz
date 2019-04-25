const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
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
    min: 0,
    max: 255
  },
  green: {
    required: true,
    type: Number,
    min: 0,
    max: 255
  },
  blue: {
    required: true,
    type: Number,
    min: 0,
    max: 255
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Color', colorSchema);
