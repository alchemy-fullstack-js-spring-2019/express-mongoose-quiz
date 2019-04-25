const Color = require('../models/Color');
const { Router } = require('express');

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
    Color
      .find()
      .select({
        name: true,
        _id: true
      })
      .lean()
      .then(foundColor => res.send(foundColor))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(returnedColor => res.send(returnedColor))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      hex,
      red,
      green,
      blue
    } = req.body;

    Color
      .findByIdAndUpdate(id, { name, hex, red, green, blue }, { new: true })
      .select({
        name: true,
        _id: true
      })
      .lean()
      .then(updatedColor => res.send(updatedColor))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Color
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .lean()
      .then(deletedColor => res.send(deletedColor))
      .catch(next);
  });
