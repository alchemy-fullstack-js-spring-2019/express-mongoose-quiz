require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const ColorSchema = require('../lib/models/Color.js');

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

  it('creates a new color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'majenta',
        hex: '88943',
        red: 200,
        green: 20,
        blue: 60
      })
      .then(res => {
        expect(res.body).toEqual({        
          name: 'majenta',
          hex: '88943',
          red: 200,
          green: 20,
          blue: 60,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets a list of all the colors in the db', () => {
    return ColorSchema
      .create({
        name: 'majenta',
        hex: '88943',
        red: 200,
        green: 20,
        blue: 60
      })
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});

