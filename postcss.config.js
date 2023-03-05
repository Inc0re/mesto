const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    // Connect autoprefixer
    autoprefixer,
    // Use default cssnano config
    cssnano({ preset: 'default' }),
  ],
};
