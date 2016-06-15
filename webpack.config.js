const webpack = require('webpack');

module.exports = {
  entry: {
    app: './themes/apollo-like/webpack/app.js',
    archive: './themes/apollo-like/webpack/archive.js'
  },
  output: {
    path: './themes/apollo-like/source/js',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ],
  externals: {
    preact: 'preact'
  }
};
