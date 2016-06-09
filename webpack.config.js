const webpack = require('webpack');

module.exports = {
  entry: './themes/apollo-like/webpack/app.js',
  output: {
    path: './themes/apollo-like/source/js',
    filename: 'app.js'
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
    })
  ]
};
