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

  it('creates a new color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'blue',
        hex: '#0000FF',
        red: 0,
        green: 0,
        blue: 255
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'blue',
          hex: '#0000FF',
          red: 0,
          green: 0,
          blue: 255,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a list of colors', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'blue',
        hex: '#0000FF',
        red: 0,
        green: 0,
        blue: 255
      })
      .then(() => {
        return request(app)
          .post('/api/v1/colors')
          .send({
            name: 'red',
            hex: '#FF0000',
            red: 255,
            green: 0,
            blue: 0
          });
      })
      .then(() => {
        return request(app)
          .get('/api/v1/colors')
          .then(res => {
            expect(res.body).toHaveLength(2);
            expect(res.body).toEqual([
              {
                name: 'blue',
                _id: expect.any(String)
              },
              {
                name: 'red',
                _id: expect.any(String)
              }
            ]);
          });
      });
  });

  it('gets a color by id', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'blue',
        hex: '#0000FF',
        red: 0,
        green: 0,
        blue: 255
      })
      .then(color => {
        return request(app)
          .get(`/api/v1/colors/${color.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'blue',
              hex: '#0000FF',
              red: 0,
              green: 0,
              blue: 255,
              _id: color.body._id
            });
          });
      });
  });

  it('updates a color name', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'blue',
        hex: '#0000FF',
        red: 0,
        green: 0,
        blue: 255
      })
      .then(color => {
        return request(app)
          .patch(`/api/v1/colors/${color.body._id}`)
          .send({ name: 'royal blue' })
          .then(updatedColor => {
            expect(updatedColor.body).toEqual({
              name: 'royal blue',
              _id: color.body._id
            });
          });
      });
  });

  it('deletes a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'blue',
        hex: '#0000FF',
        red: 0,
        green: 0,
        blue: 255
      })
      .then(color => {
        return request(app)
          .delete(`/api/v1/colors/${color.body._id}`)
          .then(deletedColor => {
            expect(deletedColor.body).toEqual({
              _id: color.body._id
            });
          });
      });


  });


});
