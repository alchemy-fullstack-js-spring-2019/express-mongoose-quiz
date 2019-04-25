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
});
