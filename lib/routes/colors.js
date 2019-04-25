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
      .then(newColor => res.send(newColor))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Color
      .find()
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(colorList => res.send(colorList))
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
    console.log(name);
    Color
      .findByIdAndUpdate(id, { name: name }, { new: true })
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  });


