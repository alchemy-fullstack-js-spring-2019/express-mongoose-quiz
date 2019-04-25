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

  it('creates a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'jaredsPersonalColor',
        hex: '#E018BC',
        red: 224,
        green: 24,
        blue: 188
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'jaredsPersonalColor',
          hex: '#E018BC',
          red: 224,
          green: 24,
          blue: 188,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a list of all colors', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'jaredsPersonalColor',
        hex: '#E018BC',
        red: 224,
        green: 24,
        blue: 188
      })
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toEqual({ 
          _id: expect.any(String),
          name: expect.any(String),
          hex: expect.any(String),
          red: expect.any(Number),
          green: expect.any(Number),
          blue: expect.any(Number) 
        });
      });
  });

  it('gets color by id', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'jaredsPersonalColor',
        hex: '#E018BC',
        red: 224,
        green: 24,
        blue: 188
      })
      .then(color => {
        return request(app)
          .get(`/api/v1/colors/${color.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'jaredsPersonalColor',
          hex: '#E018BC',
          red: 224,
          green: 24,
          blue: 188,
          _id: expect.any(String)
        });
      });
  });
});
