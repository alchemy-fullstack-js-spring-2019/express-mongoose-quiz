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

  const colorDummy = {
    name: 'clay',
    hex: '#90392A',
    red: 144,
    green: 57,
    blue: 42
  };
  
  const createColor = () => {
    return Color.create({
      name: 'clay',
      hex: '#90392A',
      red: 144,
      green: 57,
      blue: 42
    });
  };

  it('POSTs a new color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send(colorDummy)
      .then(res => {
        expect(res.body).toEqual({
          ...colorDummy,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('GETs a list of colors', () => {
    return createColor()
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('Gets a color by ID', () => {
    return createColor()
      .then(createdColor => {
        return request(app)
          .get(`/api/v1/colors/${createdColor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          ...colorDummy,
          _id: expect.any(String)
        });
      });
  });

  it('Patches a color\'s name', () => {
    return createColor()
      .then(createdColor => {
        return request(app)
          .patch(`/api/v1/colors/${createdColor._id}`)
          .send({ name: 'dust' });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'dust',
          _id: expect.any(String)
        });
      });
  });
});
