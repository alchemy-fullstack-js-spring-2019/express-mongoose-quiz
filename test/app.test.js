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

  it('can post a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Red',
        hex: '#FF0000',
        red: 255,
        green: 0,
        blue: 0
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Red',
          hex: '#FF0000',
          red: 255,
          green: 0,
          blue: 0,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
