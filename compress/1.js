const htmlmin = require('htmlmin');
const fs = require('fs');

const htmlCode = fs.readFileSync('anime.html', 'utf8');
const minifiedHtml = htmlmin.minify(htmlCode, {
  useShortDoctype: true,
  removeComments: true,
  collapseWhitespace: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyJS: true
});

fs.writeFileSync('anime.min.html', minifiedHtml);