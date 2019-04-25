const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      hex,
      red,
      green,
      blue
    } = req.body;
    Color
      .create({ name, hex, red, green, blue })
      .then(createdColor => res.send(createdColor))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Color.find()
      .select({ 
        __v: false,
        hex: false,
        red: false,
        green: false,
        blu: false
      })
      .lean()
      .then(list => res.send(list))
      .catch(next);
  });
