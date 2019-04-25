require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
// const colorSchema = require('../lib/models/Color');


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

  it('can can create a new color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'color1',
        hex: '444444',
        red: '22',
        blue: '22',
        green: '22'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'color1',
          hex: '444444',
          red: '22',
          blue: '22',
          green: '22'
        });
      });
  });
});
