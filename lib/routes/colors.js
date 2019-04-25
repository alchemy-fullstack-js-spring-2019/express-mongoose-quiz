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
      .then(newColor => {
        res.send(newColor);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Color
      .find()
      .select({
        __v: false,
        hex: false,
        red: false,
        green: false,
        blue: false
      })
      .lean()
      .then(colors => {
        res.send(colors);
      })
      .catch(next);
  });
