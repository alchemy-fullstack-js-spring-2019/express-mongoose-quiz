require('dotenv').config();

const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/colors', (req, res, next) => {
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

  .get('/colors', (req, res, next) => {
    Color
      .find()
      .lean()
      .select({
        __v: false
      })
      .then(colors => res.send(colors))
      .catch(next);
  })

  .get('/colors/:id', (req, res, next) => {
    const { id } = req.params._id;
    Color
      .findById(id)
      .lean()
      .select({ __v: false })
      .then(color => res.send(color))
      .catch(next);
  })

  .delete('/colors/:id', (req, res, next) => {
    const { id } = req.params._id;
    Color
      .findOneAndDelete(id)
      .lean()
      .select({
        __v: false
      })
      .then(color => res.send(color))
      .catch(next);
  });
