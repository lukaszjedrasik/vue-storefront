const path = require('path');

module.exports = function CommerceToolsShipping() {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
  });
};

module.exports.meta = require('../package.json');
