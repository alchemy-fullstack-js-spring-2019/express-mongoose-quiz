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
  });
