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

  it('creates a new color and responds with created color', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'red',
        hex: 'ff0000',
        red: 255,
        green: 0,
        blue: 0
      })
      .then(color => {
        expect(color.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'red',
          hex: 'ff0000',
          red: 255,
          green: 0,
          blue: 0
        });

      });
  });

  it('responds with a list of colors', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'red',
        hex: 'ff0000',
        red: 255,
        green: 0,
        blue: 0
      })
      .then(() => {
        return request(app)
          .get('/api/v1/colors')
          .then(colors => {
            expect(colors.body).toHaveLength(1);
          });
      });
  });

  it('gets a color by id', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'red',
        hex: 'ff0000',
        red: 255,
        green: 0,
        blue: 0
      })
      .then(color => {
        return request(app)
          .get(`/api/v1/colors/${color.body._id}`)
          .then(returnedColor => {
            expect(returnedColor.body).toEqual({
              _id: color.body._id,
              name: 'red',
              hex: 'ff0000',
              red: 255,
              green: 0,
              blue: 0
            });
          });
  
      });
  });

  it('updates a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'red',
        hex: 'ff0000',
        red: 255,
        green: 0,
        blue: 0
      })
      .then(color => {
        return request(app)
          .patch(`/api/v1/colors/${color.body._id}`)
          .send({
            name: 'even redder red',
            hex: 'ff0000',
            red: 255,
            green: 0,
            blue: 0 
          });
      })
      .then(updatedColor => {
        expect(updatedColor.body).toEqual({
          _id: expect.any(String),
          name: 'even redder red',
          hex: 'ff0000',
          red: 255,
          green: 0,
          blue: 0 
        });
      });
  });

  it('can delete a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'red',
        hex: 'ff0000',
        red: 255,
        green: 0,
        blue: 0
      })
      .then(color => {
        return Promise.all([
          Promise.resolve(color.body._id.toString()),
          request(app)
            .delete(`/api/v1/colors/${color.body._id}`)
        ]);
      })
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          _id
        });
      });
  });
});
