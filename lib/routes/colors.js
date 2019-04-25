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
      .then(color => {
        res.send(color);
      })
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
      .then(colors => res.send(colors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    console.log('get by id', req.params.id);
    Color
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);

  });
