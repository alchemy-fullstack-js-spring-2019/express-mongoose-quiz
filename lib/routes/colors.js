const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name,
      hex,
      red,
      green,
      blue,
    } = req.body;

    Color
      .create({ name, hex, red, green, blue })
      .then(createdColor => res.send(createdColor));
  });

// .get('/', (req, res) => {

//   Tags
//     .find()
//     .then(tags => res.send(tags));
  
// })

// .get('/:id', (req, res) => {
//   const { id } = req.params;

//   Tags
//     .findById(id)
//     .then(foundTag => res.send(foundTag));
// })
  
// .put('/:id', (req, res) => {
//   const { id } = req.params;
//   const {
//     name
//   } = req.body;
//   Tags
//     .findByIdAndUpdate(id, { name: name })
//     .then(updated => res.send(updated));
// })

// .delete('/:id', (req, res) => {
//   const { id } = req.params;
    
//   Tags
//     .findByIdAndDelete(id)
//     .then(deleted => res.send(deleted));
// });
