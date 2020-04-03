const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');

glob.sync( './src/**/*.js' ).map((file) => {
  const basename = path.basename(file).replace('js', 'html');
  const publicPath = path.resolve(__dirname, '..', 'public', basename);
  const page = require(path.resolve(file));
  fs.ensureFileSync(publicPath);
  fs.writeFileSync(publicPath, page.asHTML(), 'utf-8');
});
