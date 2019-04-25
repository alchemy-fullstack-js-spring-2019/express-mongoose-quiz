require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
// const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const Color = require('../lib/models/Color');

describe('color routes', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/color', {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it.only('can create a new beautiful color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({ name: 'lavender', hex: '967bb6', red: 59, green: 48, blue: 71 })
      .then(res => {
        expect(res.body).toEqual({
          name: 'lavender',
          hex: '967bb6',
          red: 59,
          green: 48,
          blue: 71,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets a list of colors', () => {
    return Color()
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(color => {
        expect(color.body).toHaveLength(1);
      });
  }); 
});
