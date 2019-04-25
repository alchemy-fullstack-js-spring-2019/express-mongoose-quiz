const { Router } = require('express');
const Tags = require('../models/Color');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name,
    } = req.body;

    Tags
      .create({ name })
      .then(createdTag => res.send(createdTag));
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
