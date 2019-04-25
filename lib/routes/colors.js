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
