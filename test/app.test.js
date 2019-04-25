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

  it('can create a color', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'chartreuse',
        hexValue: '#7fff00',
        red: 25,
        green: 115,
        blue: 130
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'chartreuse',
          hexValue: '#7fff00',
          red: 25,
          green: 115,
          blue: 130,
          __v: 0
        
        });
      });
  });
  it('can get a list of colors', () => {
    return Color
      .create({ name: 'pink', hexValue:'', red: 111, blue: 23, green: 149 })
      .then(() => {
        return request(app)
          .get('/api/v1/colors');


      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});

