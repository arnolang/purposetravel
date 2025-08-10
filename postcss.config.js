const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    purgecss({
      content: ['./**/*.html', './**/*.js'],
      defaultExtractor: (content) => content.match(/[^<>()"'`\s]*[^<>()"'`\s:]/g) || [],
    }),
    cssnano({ preset: 'default' }),
  ],
};