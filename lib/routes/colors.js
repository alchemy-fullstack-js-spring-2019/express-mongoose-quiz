const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, r, g, b } = req.body;
    Color
      .create({ name, hex, r, g, b })
      .then(color => res.send(color))
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
      .then(colors => res.send(colors))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  })
  
  .patch('/:id', (req, res, next) => {
    const { name } = req.body;
    Color
      .findByIdAndUpdate(req.params.id, { name }, { new: true })
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  });
