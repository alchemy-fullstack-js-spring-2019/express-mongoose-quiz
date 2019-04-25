const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      hex,
      red,
      blue,
      green
    } = req.body;
    Color
      .create({ name, hex, red, blue, green })
      .then(color => res.send(color))
      .catch(next);
  });
