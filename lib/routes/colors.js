const Color = require('../models/Color.js');
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
      .create({
        name,
        hex,
        red, 
        green, 
        blue
      })
      .then(color => res.send(color))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Color 
      .find()
      .lean()
      .select({
        _id: true,
        name: true
      })
      .then(colors => res.send(colors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .lean()
      .select({ __v: false })
      .then(color => res.send(color))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const {
      name
    } = req.body;
    
    Color
      .findByIdAndUpdate(req.params.id, { name }, { new: true })
      .lean()
      .select({
        name: true,
        _id: true
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
      .then(deleted => res.send(deleted))
      .catch(next);
  });
