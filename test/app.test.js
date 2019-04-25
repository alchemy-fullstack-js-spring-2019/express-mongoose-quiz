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

  const createColor = () => {
    return Color.create({ 
      name: 'purple',
      hex: '#ce42f4',
      red: 206,
      green: 66,
      blue: 244
    })
  };

  it('POSTs/creates a new color', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'purple',
        hex: '#ce42f4',
        red: 206,
        green: 66,
        blue: 244
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'purple',
          hex: '#ce42f4',
          red: 206,
          green: 66,
          blue: 244,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('GETS all colors', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'purple',
        hex: '#ce42f4',
        red: 206,
        green: 66,
        blue: 244
      })
      .then(() => {
        return request(app)
          .get('/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});
