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

  const testColor = {
    name: 'blue',
    hex: '	#0000FF',
    red: 0,
    green: 0,
    blue: 255
  };

  it('creates a new color', async() => {
    const res = await request(app)
      .post('/api/v1/colors')
      .send(testColor);

    expect(res.body).toEqual({
      _id: expect.any(String),
      __v: 0,
      name: 'blue',
      hex: '	#0000FF',
      red: 0,
      green: 0,
      blue: 255
    });
  });

  it('gets a list of colors', async() => {
    await request(app)
      .post('/api/v1/colors')
      .send(testColor);

    const res = await request(app)
      .get('/api/v1/colors');

    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toEqual({
      _id: expect.any(String),
      name: 'blue'
    });
  });

  it('gets a color by id', async() => {
    const createdRes = await request(app)
      .post('/api/v1/colors')
      .send(testColor);

    const res = await request(app)
      .get(`/api/v1/colors/${createdRes.body._id}`);
    
    expect(res.body).toEqual({
      _id: createdRes.body._id.toString(),
      name: 'blue',
      hex: '	#0000FF',
      red: 0,
      green: 0,
      blue: 255
    });
  });

  it('can update a color name by id', async() => {
    const createdRes = await request(app)
      .post('/api/v1/colors')
      .send(testColor);

    const res = await request(app)
      .patch(`/api/v1/colors/${createdRes.body._id}`)
      .send({ name: 'really blue', hex: 'ignore this' });

    expect(res.body).toEqual({
      _id: createdRes.body._id.toString(),
      name: 'really blue'
    });
  });

  it('can delete a color by id', async() => {
    const createdRes = await request(app)
      .post('/api/v1/colors')
      .send(testColor);

    const res = await request(app)
      .delete(`/api/v1/colors/${createdRes.body._id}`);

    expect(res.body).toEqual({
      _id: createdRes.body._id.toString()
    });
  });
});
