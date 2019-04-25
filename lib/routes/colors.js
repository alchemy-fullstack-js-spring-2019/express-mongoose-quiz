const { Router } = require('express');
const ColorSchema = require('../models/Color.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      hex,
      red,
      green,
      blue
    } = req.body;
    ColorSchema
      .create({ name, hex, red, green, blue })
      .then(newColor => res.send(newColor))
      .catch(next);
  }); 
