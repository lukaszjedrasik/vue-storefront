const path = require('path');

export default function storyblok (moduleOptions) {
  const options = {
    ...this.options.storyblok,
    ...moduleOptions
  };
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  });
}
