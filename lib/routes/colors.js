const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, r, g, b } = req.body;
    Color
      .create({ name, hex, r, g, b })
      .then(color => res.send(color))
      .catch(next);
  });
