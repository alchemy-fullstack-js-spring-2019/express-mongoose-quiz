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

  const newColor = {
    name: 'magenta',
    hex: 'ahex',
    red: 55,
    green: 45,
    blue: 100
  };

  it('can create a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send(newColor)
      .then(res => {
        expect(res.body).toEqual({
          name: 'magenta',
          hex: 'ahex',
          red: 55,
          green: 45,
          blue: 100,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('can get a list of all colors', () => {
    return Color.create(newColor)
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toEqual([{
          name: 'magenta',
          _id: expect.any(String)
        }]);
      });
  });
});
