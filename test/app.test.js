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

  it('POSTs/creates a new color', () => { 
    return request(app)
      .post('/api/v1/colors')
      .send({
        name: 'purple',
        hex: '#ce42f4',
        red: 206,
        green: 66,
        blue: 244
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'purple',
          hex: '#ce42f4',
          red: 206,
          green: 66,
          blue: 244,
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  const createColor = () => {
    return Color.create({
      name: 'purple',
      hex: '#ce42f4',
      red: 206,
      green: 66,
      blue: 244  
    });
  };

  it('GETS a list of all colors', () => {
    return Color.create({
      name: 'purple',
      hex: '#ce42f4',
      red: 206,
      green: 66,
      blue: 244  
    })
      .then(() => {
        return request(app)
          .get('/api/v1/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a color by id', () => {
    return createColor()
      .then(createdColor => {
        return request(app)
          .get(`/api/v1/colors/${createdColor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'purple',
          hex: '#ce42f4',
          red: 206,
          green: 66,
          blue: 244,
          _id: expect.any(String)  
        });
      });
  });

  it('can update a color by id', () => {
    return createColor()
      .then(color => {
        return Promise.all([
          color,
          request(app)
            .patch(`/api/v1/colors/${color._id}`)
            .send({ name: 'deep purple' })
        ]);
      })
      // eslint-disable-next-line no-unused-vars
      .then(([color, res]) => {
        expect(res.body).toEqual({
          name: 'deep purple',
          hex: '#ce42f4',
          red: 206,
          green: 66,
          blue: 244,
        });
      });
  });

  it('can delete a color by id', () => {
    return createColor()
      .then(color => {
        return Promise.all([
          Promise.resolve(color._id.toString()),
          request(app).delete(`/api/v1/colors/${color._id}`)
        ]);
      })
      // eslint-disable-next-line no-unused-vars
      .then(([_id, res]) => {
        expect(res.body).toEqual({
          _id: expect.any(String) 
        });
      });
  });
});
