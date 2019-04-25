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
        r: 255,
        g: 0,
        b: 0
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Red',
          hex: '#FF0000',
          r: 255,
          g: 0,
          b: 0,
          __v: 0
        });
      });
  });

  it('can get a list of colors', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Red',
        hex: '#FF0000',
        r: 255,
        g: 0,
        b: 0
      })
      .then(() => request(app).get('/api/v1/colors'))
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          name: 'Red'
        });
      });
  });

  it('can get a color by id', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Blue',
        hex: '#0000FF',
        r: 0,
        g: 0,
        b: 255
      })
      .then(res => request(app).get(`/api/v1/colors/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Blue',
          hex: '#0000FF',
          r: 0,
          g: 0,
          b: 255
        });
      });
  });


});
