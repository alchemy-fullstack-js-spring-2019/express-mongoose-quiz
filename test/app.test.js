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

  it('can get list of colors', () => {
    return Color
      .create({ name: 'aqua', hex: '00FFF', red: 0, green: 255, blue: 255 })
      .then(() => {
        return request(app)
          .get('/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});
