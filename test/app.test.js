require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const chance = require('chance')();
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
//const colors = require('../lib/routes/colors');
const Color = require('../lib/models/Color');

// function createColor() {
//   return Color
//     .create({
//       name: chance.name(),
//       hex: '#6666ff',
//       red: 35,
//       green: 20,
//       blue: 200
//     });
// }

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

  it('POST route, creates new color and returns it', () => {
    const color = new Color({
      name: 'TestMe',
      hex: '#6666ff',
      red: 35,
      green: 20,
      blue: 200,
    });
    expect(color.toJSON()).toEqual({
      name: 'TestMe',
      hex: '#6666ff',
      red: 35,
      green: 20,
      blue: 200,
      _id: expect.anything()
    });
  });
  it('exists', () => {
    expect(0).toEqual(0);
  });
});
