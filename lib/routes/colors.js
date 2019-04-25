const { Router } = require('express');
const colorSchema = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, blue, red, green } = req.body;

    colorSchema
      .create({ name, hex, blue, red, green })
      .then(newFilm => res.send(newFilm))
      .catch(next);
  })
;
