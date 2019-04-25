const { Router } = require('express');
const colorSchema = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex } = req.body;

    colorSchema
      .create({ name, hex })
      .then(newFilm => res.send(newFilm))
      .catch(next);
  })
;
