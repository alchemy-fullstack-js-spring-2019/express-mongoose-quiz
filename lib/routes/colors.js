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
    Color.create({
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
    Color.find()
      .lean()
      .select({
        hex: false,
        red: false,
        green: false,
        blue: false,
        __v: false
      })
      .then(colors => res.send(colors))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .select({ __v: false })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Color
      .findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
      .select({
        hex: false,
        red: false,
        green: false,
        blue: false,
        __v: false
      })
      .lean()
      .then(updated => res.send(updated))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Color
      .findByIdAndDelete(req.params.id)
      .select({
        name: false,
        hex: false,
        red: false,
        green: false,
        blue: false,
        __v: false  
      })
      .lean()
      .then(deletedColor => res.send(deletedColor))
      .catch(next);
  })
;
