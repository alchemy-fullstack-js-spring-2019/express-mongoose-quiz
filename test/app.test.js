require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');

describe('color routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  const colorDummy = {
    name: 'clay',
    hex: '#90392A',
    red: 144,
    green: 57,
    blue: 42
  };

  it('POSTs a new color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send(colorDummy)
      .then(res => {
        expect(res.body).toEqual({
          ...colorDummy,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
