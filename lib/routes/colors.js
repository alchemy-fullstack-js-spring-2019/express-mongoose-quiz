const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      hex,
      red,
      blue,
      green
    } = req.body;
    Color
      .create({ name, hex, red, blue, green })
      .then(color => res.send(color))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Color
      .find()
      .select({
        _id: true,
        color: true
      })
      .then(colors => res.send(colors))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .select({
        __v: false
      })
      .then(color => res.send(color))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { body } = req.body;
    Color
      .findByIdAndUpdate(req.params.id, { body }, { new: true })
      .select({
        __v: false
      })
      .then(newColor => res.send(newColor))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Color
      .findByIdAndDelete(req.params.id)
      .select({
        _id: true
      })
      .then(deletedColor => res.send(deletedColor))
      .catch(next);
  });
