const { Router } = require('express');
const Color = require('../models/Color');

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
      .select({})
      .then(colors => res.send(colors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .select({
        __v:false
      })
      .lean()
      .then(foundColor => res.send(foundColor))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Color
      .find({ 'color': id })
      .then(list => {
        if(list.length > 0) {
          const err = new Error('This color cannot be deleted');
          next(err);
        } else {
          Color
            .findByIdAndDelete(req.params.id)
            .select({
              _id: true
            })
            .lean()
            .then(deleted => res.send(deleted))
            .catch(next);
        }
      });
  });
