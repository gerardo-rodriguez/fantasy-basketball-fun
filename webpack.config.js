'use strict';

var path = require('path');

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'public/javascripts')
};

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        // Limit the ES2015->ES5 transpile to only our app directory
        include: PATHS.app
      }
    ]
  },
  resolve: {
    // Allows me to require() without the .js/.jsx extensions
    extensions: ['','.js','.jsx']
  }
};
