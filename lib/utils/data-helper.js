require('dotenv').config();
const Color = require('../../lib/models/Color');
const { seedColors } = require('./seed-data');

beforeEach(() => {
  return seedColors();
});

const prepare = model => JSON.parse(JSON.stringify(model));
const createGetters = Model => ({
  [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
  [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
});

module.exports = {
  ...createGetters(Color)
};
