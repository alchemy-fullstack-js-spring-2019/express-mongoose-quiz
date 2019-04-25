require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
const colors = require('../lib/routes/colors');
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

  it('POST route, creates new color and returns it', () => {
    return Color.create({
      name: 'ColorIt',
      hex: '#6666ff',
      red: 35,
      green: 20,
      blue: 200
    })
      .then(res => {
        expect(res.body).toEqual({
          name: 'ColorIt',
          hex: '#6666ff',
          red: 35,
          green: 20,
          blue: 200,
          _id: expect.any(String),
          __v: expect.any(Number)
        });
      });
  });

  // it('GET route respond with list of colors, w. only ID and name', () => {


  // });
});

// it('can get a list of tweets', () => {
//   return User.create({ handle: 'chris', name: 'bo-biss', email: 'AndInDarkness@Bind.Them' })
//     .then(user => {
//       return Tweet.create({ user: user._id, body: 'my LOTR tweet' });
//     })
//     .then(() => {
//       return request(app)
//         .get('/tweets/all');
//     })
//     .then(res => {
//       expect(res.body).toHaveLength(1);
//     });
// });

