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

  it('creates a new color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'blue',
        hex: '#0000FF',
        red: 0,
        green: 0,
        blue: 0
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'blue',
          hex: '#0000FF',
          red: 0,
          green: 0,
          blue: 0,
          _id: expect.any(String),
          __v: 0
        });
      });
  });


});
