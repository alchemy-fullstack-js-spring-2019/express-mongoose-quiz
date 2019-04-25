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
  })
  .get('/', (req, res, next) => {
    ColorSchema
      .find()
      .lean()
      .select({
        name: true
      })
      .then(colorsList => res.send(colorsList))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    ColorSchema
      .findById(id)
      .lean()
      .select({
        __v: false
      })
      .then(foundColor => res.send(foundColor))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      name
    } = req.body;
    ColorSchema
      .findByIdAndUpdate(id, { name }, { new: true })
      .lean()
      .select({
        name: true
      })
      .then(updatedColor => res.send(updatedColor))
      .catch(next);
  });
