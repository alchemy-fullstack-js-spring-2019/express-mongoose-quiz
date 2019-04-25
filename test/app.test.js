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

  it('creates a color with POST', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'test',
        hex: 'abc',
        red: 1,
        green: 2,
        blue: 3
      })
      .then(color => {
        expect(color.body).toEqual({
          name: 'test',
          hex: 'abc',
          red: 1,
          green: 2,
          blue: 3,
          __v: 0,
          _id: expect.any(String)
        });
      });
  });
});
