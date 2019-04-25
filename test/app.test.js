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

  it('creates a color', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'black',
        hex: '000000',
        red: 0,
        green: 0,
        blue: 0
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'black',
          hex: '000000',
          red: 0,
          green: 0,
          blue: 0,
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of posts', () =>{
    return Color
      .create({
        name: 'black',
        hex: '000000',
        red: 0,
        green: 0,
        blue: 0
      })
      .then(() => {
        return Color
          .create({
            name: 'white',
            hex: 'FFFFFF',
            red: 255,
            green: 255,
            blue: 255
          });
      })
      .then(() => {
        return request(app)
          .get('/api/v1/colors')
          .then(res => {
            expect(res.body).toHaveLength(2);
            expect(res.body[1]).toEqual({
              _id: expect.any(String),
              name: 'white'
            });
          });
      });
  });

  it('gets a color by id', () => {
    return Color
      .create({
        name: 'black',
        hex: '000000',
        red: 0,
        green: 0,
        blue: 0
      })
      .then(createdColor => {
        return request(app)
          .get(`/api/v1/colors/${createdColor._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'black',
              hex: '000000',
              red: 0,
              green: 0,
              blue: 0,
              _id: expect.any(String)
            });
          });
      });

  });
});
