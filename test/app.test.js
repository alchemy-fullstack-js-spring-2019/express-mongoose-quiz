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

  it('can get all the colors', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Red',
        hex: '#FF0000',
        red: 255,
        green: 0,
        blue: 0
      })
      .then(() => request(app).get('/api/v1/colors'))
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body).toContainEqual({
          name: 'Red',
          _id: expect.any(String)
        });
      });
  });

  it('can find a color by the id', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Red',
        hex: '#FF0000',
        red: 255,
        green: 0,
        blue: 0
      })
      .then(res => request(app).get(`/api/v1/colors/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          name: 'Red',
          hex: '#FF0000',
          red: 255,
          green: 0,
          blue: 0,
          _id: expect.any(String)
        });
      });
  });
});
