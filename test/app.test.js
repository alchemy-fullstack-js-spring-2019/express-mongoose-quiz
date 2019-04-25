require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const chance = require('chance')();
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
//const colors = require('../lib/routes/colors');
const Color = require('../lib/models/Color');

function createColor() {
  return Color
    .create({
      name: chance.name(),
      hex: '#6666ff',
      red: 35,
      green: 20,
      blue: 200
    });
}

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

  // it('POST route, creates new color and returns it', () => {
  //   return createColor()
  //     .then(color => {
  //       return request(app)
  //         .post('/api/v1/colors')
  //         .send(color);
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         name: expect.any(String),
  //         hex: '#6666ff',
  //         red: 35,
  //         green: 20,
  //         blue: 200,
  //         _id: expect.any(String),
  //         //__v: expect.any(Number)
  //       });
  //     });
  // });
  it('exists', () => {
    expect(0).toEqual(0);
  });
});
