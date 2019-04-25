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
    return Color
      .create({
        name: 'mint magic',
        hex: '#54e5d4',
        red: 84,
        green: 229,
        blue: 212
      })
      .then(color => {
        return request(app)
          .post('/api/v1/colors')
          .send({
            name: color.name,
            hex: color.hex,
            red: color.red,
            green: color.green,
            blue: color.blue
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'mint magic',
          hex: '#54e5d4',
          red: 84,
          green: 229,
          blue: 212,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get a list of colors', () => {
    return Color
      .create({
        name: 'mint magic',
        hex: '#54e5d4',
        red: 84,
        green: 229,
        blue: 212
      })
      .then(()=> {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a color by id', () => {
    return Color
      .create({
        name: 'mint magic',
        hex: '#54e5d4',
        red: 84,
        green: 229,
        blue: 212
      })
      .then(createdColor => {
        return request(app)
          .get(`/api/v1/colors/${createdColor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'mint magic',
          hex: '#54e5d4',
          red: 84,
          green: 229,
          blue: 212,
          _id: expect.any(String)
        });
      });
  });
  it('can update a color by id', () => {
    return Color
      .create({
        name: 'mint magic',
        hex: '#54e5d4',
        red: 84,
        green: 229,
        blue: 212
      })
      .then(createdColor => {
        return request(app)
          .patch(`/api/v1/colors/${createdColor._id}`)
          .send({
            name: 'the mintiest'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'the mintiest',
          _id: expect.any(String)
        });
      });
  });
  it('can delete by id', () => {
    return Color
      .create({
        name: 'mint magic',
        hex: '#54e5d4',
        red: 84,
        green: 229,
        blue: 212
      })
      .then(createdColor => {
        return request(app)
          .delete(`/api/v1/colors/${createdColor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String)
        });
      });
  });
});
