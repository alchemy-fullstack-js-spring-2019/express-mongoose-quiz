const { Router } = require('express');
const Colors = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      hexValue,
      red,
      green,
      blue
    } = req.body;

    Colors
      .create({ name, hexValue, red, green, blue })
      .then(color => res.send(color))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Colors
      .find()
      .select({
        __v: false
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);

  });

