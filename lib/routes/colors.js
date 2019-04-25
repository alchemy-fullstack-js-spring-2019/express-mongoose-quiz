const { Router } = require('express');
const Color = require('../../lib/models/Color');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const { name, hex, red, green, blue } = req.body;
    try {
      const createdColor = await Color
        .create({ name, hex, red, green, blue });
      res.send(createdColor);
    } catch(err) {
      next(err);
    }    
  })

  .get('/', async(req, res, next) => {
    try {
      const colors = await Color
        .find()
        .lean()
        .select({ 
          name: true
        });
      res.send(colors);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async(req, res, next) => {
    try {
      const foundColor = await Color
        .findById(req.params.id)
        .lean()
        .select({
          __v: false
        });
      res.send(foundColor);
    } catch(err) {
      next(err);
    }
  })

  .patch('/:id', async(req, res, next) => {
    const { name } = req.body;
    try {
      const updatedColor = await Color
        .findByIdAndUpdate(req.params.id, { name }, { new: true })
        .lean()
        .select({
          name: true
        });
      res.send(updatedColor);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async(req, res, next) => {
    try {
      const deletedColor = await Color
        .findByIdAndDelete(req.params.id)
        .lean()
        .select({
          _id: true
        });
      res.send(deletedColor);
    } catch(err) {
      next(err);
    }
  });
