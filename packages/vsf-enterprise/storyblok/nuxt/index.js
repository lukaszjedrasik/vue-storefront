import path from 'path';

export default function storyblok (moduleOptions) {
  const options = {
    ...this.options.storyblok,
    ...moduleOptions
  };
  const scripts = this.options.head.script;
  scripts.push({
    src: `https://app.storyblok.com/f/storyblok-latest.js?t=${options.accessToken}`
  });
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    options
  });
}
