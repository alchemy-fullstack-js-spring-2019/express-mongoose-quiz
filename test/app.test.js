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

  const obj = {
    name: 'name',
    hex: '333',
    red: 5,
    green: 5,
    blue: 5
  };

  it('can create a new color', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send(obj)
      .then(res => {
        expect(res.body).toEqual({
          ...obj,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets list of colors', () => {
    return Color.create(obj)
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('get color by id', () => {
    return Color.create(obj)
      .then(color => {
        return request(app)
          .get(`/api/v1/colors/${color._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          ...obj,
          _id: expect.any(String)
        });
      });
  });
  
  it('update color by id', () => {
    return Color.create(obj)
      .then(color => {
        return request(app)
          .patch(`/api/v1/colors/${color._id}`)
          .send({ name: 'black' });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'black',
          _id: expect.any(String)
        });
      });
  });

});
