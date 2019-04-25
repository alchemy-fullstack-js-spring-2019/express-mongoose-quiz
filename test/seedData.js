const chance = require('chance').Chance();
const Color = require('../lib/models/Color');

module.exports = ({
  colorCount = 5
} = {}) => {
  const colors = [...Array(colorCount)]
    .map(() => ({
      name: chance.city(),
      hex: chance.string({ length: 6 }),
      red: 255,
      green: 255,
      blue: 255
    }));
    
  return Color
    .create(colors)
    .then(colors => {
      return colors;
    });
};

