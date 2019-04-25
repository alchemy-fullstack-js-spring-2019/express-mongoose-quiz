require('dotenv').config();
//const mongoose = require('mongoose');
const { Router } = require('express');
const Color = require('../models/Color');

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
      .then(createdColor => res.send(createdColor))
      .catch(next);
  });
