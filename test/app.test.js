require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const Color = require('../lib/models/Color');

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

  it('can create a new color', () => {
    return Color.create({
      name: 'mint magic',
      hex: '#54e5d4',
      red: 84,
      green: 229,
      blue: 212
    })
      .then(color => {
        return request(app)
          .post('/colors')
          .send({
            name: color.name,
            hex: color.hex,
            red: color.red,
            green: color.green,
            blue: color.blue
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'mint magic',
          hex: '#54e5d4',
          red: 84,
          green: 229,
          blue: 212,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
