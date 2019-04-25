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

  it('create a new color', () => {
    return request(app)
      .post('/colors')
      .send({ name: 'aqua', hex: '00FFF', red: 0, green: 255, blue: 255 })
      .then(res => {
        expect(res.body).toEqual({
          name: 'aqua',
          hex: '00FFF',
          red: 0,
          green: 255,
          blue: 255,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
