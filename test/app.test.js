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

  it('creates a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Fierce Tan',
        hex: 'D2B48C',
        red: 210,
        green: 180,
        blue: 140
      })
      .then(createdColor => {
        expect(createdColor.body).toEqual({
          name: 'Fierce Tan',
          hex: 'D2B48C',
          red: 210,
          green: 180,
          blue: 140,
          __v: 0,
          _id: expect.any(String)
        });
      });
  });

  it('gets all colors by id and name', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Fierce Tan',
        hex: 'D2B48C',
        red: 210,
        green: 180,
        blue: 140
      })
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(foundColor => {
        expect(foundColor.body).toEqual([{
          name: 'Fierce Tan',
          _id: expect.any(String)
        }]);
      });
  });

  it('get a color by id', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Fierce Tan',
        hex: 'D2B48C',
        red: 210,
        green: 180,
        blue: 140
      })
      .then(createdColor => {
        return request(app)
          .get(`/api/v1/colors/${createdColor.body._id}`);
      })
      .then(returnedColor => {
        expect(returnedColor.body).toEqual({
          name: 'Fierce Tan',
          hex: 'D2B48C',
          red: 210,
          green: 180,
          blue: 140,
          _id: expect.any(String)
        });
      });
  });

  it('patches a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Fierce Tan',
        hex: 'D2B48C',
        red: 210,
        green: 180,
        blue: 140
      })
      .then(createdColor => {
        return request(app)
          .patch(`/api/v1/colors/${createdColor.body._id}`)
          .send({
            name: 'Robust Fern',
            hex: 'D2B48C',
            red: 100,
            green: 180,
            blue: 120
          });
      })
      .then(updatedColor => {
        expect(updatedColor.body).toEqual({
          name: 'Robust Fern',
          _id: expect.any(String)
        });
      });
  });

  it('deletes a color but theres never a good reason to delete a color FYI', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'Fierce Tan',
        hex: 'D2B48C',
        red: 210,
        green: 180,
        blue: 140
      })
      .then(createdColor => {
        return request(app)
          .delete(`/api/v1/colors/${createdColor.body._id}`)
          .then(deletedColor => {
            expect(deletedColor.body).toEqual({
              _id: expect.any(String)
            });
          });
      });
  });
});
