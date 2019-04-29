require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const app = require('../../lib/app');
const Color = require('../../lib/models/Color');
const { seedColors } = require('./seed-data');

beforeAll(() => {
  return connect();
});
beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedColors()
    .then(color => {
      return request(app)
        .post('/api/v1/colors')
        .send(color);
    });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = model => JSON.parse(JSON.stringify(model));
const createGetters = Model => ({
  [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
  [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
});

module.exports = {
  ...createGetters(Color)
};
