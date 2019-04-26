const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, red, green, blue } = req.body;

    Color
      .create({ name, hex, red, green, blue })
      .then(createdColor => res.send(createdColor))
      .catch(next);
  })
  // eslint-disable-next-line no-unused-vars
  .get('/', (req, res, next) => {
    Color
      .find()
      .lean()
      .select({
        __v: false
      })
      .then(colors => res.send(colors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Color
      .findById(id)
      .lean()
      .select({
        __v: false
      })
      .then(color => res.send(color))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Color
      .findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
      .lean()
      .select({
        _id: false,
        __v: false
      })
      .then(color => res.send(color))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Color 
      .findByIdAndDelete(req.params.id)
      .lean()
      .select({
        _id: true
      })
      .then(color => res.send(color))
      .catch(next);
  });
