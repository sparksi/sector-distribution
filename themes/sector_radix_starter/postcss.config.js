const autoprefixer = require('autoprefixer');
const inlineSVG = require('postcss-inline-svg');

module.exports = (ctx) => ({
  context: 'dist',
  map: process.env.NODE_ENV === 'production' ? false : 'inline',
  plugins: ctx.file.basename === 'ie11.css' ? [
    autoprefixer({
      grid: 'autoplace'
    })    
  ] : [
    inlineSVG({
      paths: ['src/', 'node_modules/bootstrap-icons/icons']
    })
  ]
});