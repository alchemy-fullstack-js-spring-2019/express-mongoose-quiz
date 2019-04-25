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

  it('creates a color with POST', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'test',
        hex: 'abc',
        red: 1,
        green: 2,
        blue: 3
      })
      .then(color => {
        expect(color.body).toEqual({
          name: 'test',
          hex: 'abc',
          red: 1,
          green: 2,
          blue: 3,
          __v: 0,
          _id: expect.any(String)
        });
      });
  });
  it('gets a list of colors', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'test2',
        hex: 'xyz',
        red: 3,
        green: 5,
        blue: 1
      })
      .then(() => {
        return request(app)
          .get('/api/v1/colors')
          .then(resList => {
            expect(resList.body).toHaveLength(1);
          });
      });
  });
  it('gets a single color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'test3',
        hex: 'def',
        red: 1,
        green: 1,
        blue: 1
      })
      .then(created => {
        return request(app)
          .get(`/api/v1/colors/${created.body._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'test3',
              hex: 'def',
              red: 1,
              green: 1,
              blue: 1,
              _id: expect.any(String)
            });
          });
      });
  });
  it('patches a color', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'test3',
        hex: 'def',
        red: 1,
        green: 1,
        blue: 1
      })
      .then(created => {
        return request(app)
          .patch(`/api/v1/colors/${created.body._id}`)
          .send({ name: 'dude' })
          .then(res => {
            expect(res.body).toEqual({
              name: 'dude',
              _id: expect.any(String)
            });
          });
      });
  });
  it('deletes a color, send colorname', () => {
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'test5',
        hex: 'def',
        red: 1,
        green: 1,
        blue: 1
      })
      .then(created => {
        return request(app)
          .delete(`/api/v1/colors/${created.body._id}`)
          .then(res => {
            expect(res.body).toEqual({ _id: created.body._id });
          });
      });
  });
});
