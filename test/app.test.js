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

  beforeEach(() => {
    const colorArr = [
      {
        name: 'Probably Purple',
        hex: '462759',
        red: 70,
        green: 39,
        blue: 89
      },
      {
        name: 'Grobably Green',
        hex: '098B26',
        red: 9,
        green: 139,
        blue: 38
      }];
    return Color.create(colorArr);
    
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can POST a new color', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Probably Purple',
        hex: '462759',
        red: 70,
        green: 39,
        blue: 89
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Probably Purple',
          hex: '462759',
          red: 70,
          green: 39,
          blue: 89,
          _id: expect.any(String)
        });
      });
  });
  it('can GET a list of colors', () => {
    return request(app)
      .get('/api/v1/colors')
      .then(res => {
        expect(res.body).toHaveLength(2);
      });
  });

  it('can GET a single color by ID', () => {
    return request(app)
      .get('/api/v1/colors')
      .then(res => {
        return request(app)
          .get(`/api/v1/colors/${res.body[0]._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          hex: expect.any(String),
          name: expect.any(String),
          red: expect.any(Number),
          green: expect.any(Number),
          blue: expect.any(Number)
        });
      }); 
  });
  it('can PATCH a color name', () => {
    return request(app)
      .get('/api/v1/colors')
      .then(res => {
        return request(app)
          .patch(`/api/v1/colors/${res.body[0]._id}`)
          .send({ name: 'Definitely Purple' });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Definitely Purple'
        });
      });
  });
});
