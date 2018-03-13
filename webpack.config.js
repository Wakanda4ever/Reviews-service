var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'dist/js');
var APP_DIR = path.resolve(__dirname, 'client/js');

var config = {
  entry: ['babel-polyfill', APP_DIR + '/app.js'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader?'+JSON.stringify(
          {
            presets: ['react', 'es2015'],
            "plugins": [
              "syntax-class-properties",
              "syntax-decorators",
              "syntax-object-rest-spread",

              "transform-class-properties",
              "transform-object-rest-spread"
            ]
          }
        )]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  }
};
module.exports = config;