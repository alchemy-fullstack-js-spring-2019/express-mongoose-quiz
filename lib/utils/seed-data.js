const chance = require('chance').Chance();
const Color = require('../../lib/models/Color');

function seedColors(colorCount = 5) {
  const colors = [...Array(colorCount)].map(() => ({
    name: chance.name(),
    hex: chance.color({ format: 'hex' }),
    red: chance.integer({ min: 1, max: 80 }),
    green: chance.integer({ min: 1, max: 80 }),
    blue: chance.integer({ min: 1, max: 80 })
  }));
  return Color.create(colors);
}

module.exports = {
  seedColors
};

