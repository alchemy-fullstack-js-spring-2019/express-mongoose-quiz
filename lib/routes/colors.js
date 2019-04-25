const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      name,
      hex,
      red,
      green,
      blue,
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
        _id: true,
        name: true
      })
      .lean()
      .then(colorList => res.send(colorList))
      .catch(next);
  
  })

  .get('/:id', (req, res, next) => {
    Color
      .findById(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(foundColor => res.send(foundColor))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const {
      name
    } = req.body;
    Color
      .findByIdAndUpdate(req.params.id, { name: name }, { new: true })
      .select({
        name: true,
        _id: true
      })
      .lean()
      .then(updated => res.send(updated))
      .catch(next);

    // return User
    // .findByIdAndUpdate(req.params.id, updateObj, { new: true })
    // .select({
    //   __v: false
    // })
    // .lean()
    // .then(result => res.send(result))
  });

// .delete('/:id', (req, res) => {
//   const { id } = req.params;
    
//   Tags
//     .findByIdAndDelete(id)
//     .then(deleted => res.send(deleted));
// });
