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
  })

  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(color => {
        res.send(color);
      })
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Color
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .select({
        __v: false,
        hex: false,
        red: false,
        green: false,
        blue: false
      })
      .lean()
      .then(updatedColor => {
        res.send(updatedColor);
      })
      .catch(next);
  });
