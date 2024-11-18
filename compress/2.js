const postcss = require('postcss');
const cssnano = require('cssnano');
const fs = require('fs');

const cssCode = fs.readFileSync('css\index.css', 'utf8');
const plugins = [cssnano()];

postcss(plugins)
  .process(cssCode, { from: 'css\index.css', to: 'style.min.css' })
  .then(result => {
    fs.writeFileSync('style.min.css', result.css);
  })
  .catch(error => {
    console.error(error);
  });