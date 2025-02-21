const path = require('path'); // Add this line
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  entry: './js/cd.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [
    new WebpackObfuscator({
      rotateStringArray: true,
      compact: true,
      controlFlowFlattening: true,
    }),
  ],
};