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
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'fancy',
        hex: '123FFF',
        red: 5,
        green: 100,
        blue: 250
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'fancy',
          hex: '123FFF',
          red: 5,
          green: 100,
          blue: 250,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of colors', () => {
    return Color.create({
      name: 'fancy',
      hex: '123FFF',
      red: 5,
      green: 100,
      blue: 250
    })
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'fancy'
        }]);
      });
  });

  it('can get a color by id', () => {
    return Color.create({
      name: 'fancy',
      hex: '123FFF',
      red: 5,
      green: 100,
      blue: 250
    })
      .then(color => {
        return request(app)
          .get(`/api/v1/colors/${color._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'fancy',
          hex: '123FFF',
          red: 5,
          green: 100,
          blue: 250,
          _id: expect.any(String)
        });
      });
  });
});
