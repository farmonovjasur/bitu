const path = require('path');
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
      rotateStringArray: true, // Obfuscate strings
      compact: true, // Compact code
      controlFlowFlattening: true, // Make control flow harder to follow
    }),
  ],
};