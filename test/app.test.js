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

  it('add your tests', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'awesome',
        hex: '555555',
        red: 46,
        green: 46,
        blue: 46
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'awesome',
          hex: '555555',
          red: 46,
          green: 46,
          blue: 46,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all the colors', () => {
    return Color
      .create({
        name: 'super rad',
        hex: '555555',
        red: 46,
        green: 46,
        blue: 46
      })
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
        expect(res.body).toEqual([{ name: 'super rad', _id: expect.any(String) }]);
      });
  });

  it('gets a color by id', () => {
    return Color
      .create({
        name: 'death and taxes',
        hex: '666666',
        red: 33,
        green: 200,
        blue: 44
      })
      .then(newColor => {
        return request(app)
          .get(`/api/v1/colors/${newColor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'death and taxes',
          hex: '666666',
          red: 33,
          green: 200,
          blue: 44,
          _id: expect.any(String)
        });
      });
  });

  it('updates a color name', () => {
    return Color
      .create({
        name: 'change me',
        hex: '123EEE',
        red: 44,
        green: 200,
        blue: 144
      })
      .then(createdColor => {
        return request(app)
          .patch(`/api/v1/colors/${createdColor._id}`)
          .send({ name: 'sweet name' });
      })
      .then(updatedColor => {
        expect(updatedColor.body).toEqual({
          name: 'sweet name',
          _id: expect.any(String)
        });
      });
  });

  it('deletes a color by id', () => {
    return Color
      .create({
        name: 'awesome',
        hex: '555555',
        red: 46,
        green: 46,
        blue: 46
      })
      .then(newColor => {
        return request(app)
          .delete(`/api/v1/colors/${newColor._id}`);
      })
      .then(deletedColor => {
        expect(deletedColor.body).toEqual({
          _id: expect.any(String)
        });
      });
  });
});
