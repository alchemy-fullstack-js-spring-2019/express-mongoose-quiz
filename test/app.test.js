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
        name: 'Blue',
        hex: '#4286f4',
        red: 66,
        green: 134, 
        blue: 244  
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Blue',
          hex: '#4286f4',
          red: 66,
          green: 134, 
          blue: 244,  
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of all colors', () => {
    return Color.create({
      name: 'Blue',
      hex: '#4286f4',
      red: 66,
      green: 134, 
      blue: 244 
    })
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'Blue'
        }]);
      });
  });

  it('can get color by id', () => {
    return Color.create({
      name: 'Blue',
      hex: '#4286f4',
      red: 66,
      green: 134, 
      blue: 244
    })
      .then(createdColor => {
        return request(app)
          .get(`/api/v1/colors/${createdColor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Blue',
          hex: '#4286f4',
          red: 66,
          green: 134, 
          blue: 244
        });
      });
  });
});
