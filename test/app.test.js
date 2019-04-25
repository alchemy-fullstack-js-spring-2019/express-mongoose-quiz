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

  it('creates a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Fierce Tan',
        hex: 'D2B48C',
        red: 210,
        green: 180,
        blue: 140
      })
      .then(createdColor => {
        expect(createdColor.body).toEqual({
          name: 'Fierce Tan',
          hex: 'D2B48C',
          red: 210,
          green: 180,
          blue: 140,
          __v: 0,
          _id: expect.any(String)
        });
      });

  });
});
