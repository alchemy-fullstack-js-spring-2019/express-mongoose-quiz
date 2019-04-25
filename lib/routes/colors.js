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
      .then(createdColor => {
        res.send(createdColor);
      })
      .catch(next);
  })

  .get('/', (req, res, next)=> {
    Color
      .find()
      .select({
        name: true,
        _id: true
      })
      .lean()
      .then(colors => res.send(colors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Color
      .findById(id)
      .select({
        __v: false
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    Color
      .findByIdAndUpdate(id, { name }, { new: true })
      .select({
        name: true,
        _id: true,
      })
      .lean()
      .then(updatedColor => res.send(updatedColor))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;

    Color
      .findByIdAndDelete(id)
      .select({
        _id: true
      })
      .lean()
      .then(deletedTweet => res.send(deletedTweet))
      .catch(next);
  });
