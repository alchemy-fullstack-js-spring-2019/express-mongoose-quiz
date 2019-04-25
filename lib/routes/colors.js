
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
  });
