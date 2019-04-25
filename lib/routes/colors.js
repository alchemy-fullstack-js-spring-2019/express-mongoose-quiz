const { Router } = require('express');
const Color = require('../../lib/models/Color');

module.exports = Router()
  .post('/api/v1/colors', (req, res, next) => {
    const { 
      name, 
      hex, 
      red, 
      green,
      blue 
    } = req.body;

    Color
      .create({ name, hex, red, green, blue })
      .then(color => res.send(color))
      .catch(next);
  })
  .get('/api/v1/colors', (req, res, next) => {
    Color
      .find()
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Color
      .findById(id)
      .select({
        __v: false
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      hex,
      red,
      green,
      blue
    } = req.body;
    Color
      .findByIdAndUpdate(id, { name, hex, red, blue, green }, { new: true })
      .select({
        _id: true,
        name: true
      })
      .lean()
      .then(color => res.send(color))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Color
      .findByIdAndDelete(id)
      .select({
        _id: true
      })
      .lean()
      .then(deletedColor => res.send(deletedColor))
      .catch(next);
  });
