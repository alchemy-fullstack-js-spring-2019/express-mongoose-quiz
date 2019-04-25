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
    const updatedObject = {};
    if(req.body.name) updatedObject.name = req.body.name;
    if(req.body.hex) updatedObject.hex = req.body.hex;
    if(req.body.red) updatedObject.red = req.body.red;
    if(req.body.green) updatedObject.green = req.body.green;
    if(req.body.blue) updatedObject.blue = req.body.blue;

    Color
      .findByIdAndUpdate(req.params.id, updatedObject, { new: true })
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(updatedColor => res.send(updatedColor))
      .catch(next);
  });
