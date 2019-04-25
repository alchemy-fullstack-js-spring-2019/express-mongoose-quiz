const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, red, green, blue } = req.body;
    Color
      .create({ name, hex, red, green, blue })
      .then(color => res.send(color))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Color
      .find()
      .lean()
      .select({ name: true })
      .then(allColors => res.send(allColors))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Color
      .findById(id)
      .lean()
      .select({ __v: false })
      .then(color => res.send(color))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const name = req.body.name;
    return Color
      .findById(id)
      .then(color => {
        color.name = name;
        return color;
      })
      .then(updatedColor => {
        return Color
          .findByIdAndUpdate(id, updatedColor, { new: true })
          .lean()
          .select({ name: true })
          .then(result => res.send(result))
          .catch(next);

      });
  })
;
