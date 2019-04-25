
const Color = require('../models/Color');
const { Router } = require('express');


module.exports = Router()
  .post('/', (req, res, next) => {
     
    const { name, hex, red, green, blue } = req.body;
      
    Color
      .create({ name, hex, red, green, blue })
      .then(created=>{
        res.send(created);})
      .catch(next);
  })
  .get('/', (req, res, next) => { 
    Color
      .find()
      .then(found=>res.send(found))
      .catch(next);
         
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
      
    Color
      .findById(id)
      .then(found=>res.send(found))
      .catch(next);
         
  })
  .delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Color
      .deleteById(id)
      .then(deleted=>res.send(deleted))
      .catch(next);
  });

