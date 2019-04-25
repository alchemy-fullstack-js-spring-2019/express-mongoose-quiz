const { Router } = require('express');
const Color = require('../../lib/models/Color');

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
      .then(color => res.send(color))
      .catch(next);
  });
  // .get('/:id', (req, res, next) => {
  //   const { id } = req.params;
  //   Color
  //     .findById(id)
  //     .then(color => res.send(color))
  //     .catch(next);
  // })
  // .patch('/:id', (req, res, next) => {
  //   const { id } = req.params;
  //   const {
  //     name,
  //     hex,
  //     red,
  //     green,
  //     blue
  //   } = req.body;
  //   Color
  //     .findByIdAndUpdate(id, { name, hex, red, blue, green }, { new: true })
  //     .then(color => res.send(color))
  //     .catch(next);
  // })
  // .delete('/:id', (req, res, next) => {
  //   const { id } = req.params;
  //   Color
  //     .findByIdAndDelete(id)
  //     .then(deletedColor => res.send(deletedColor))
  //     .catch(next);
  // });
