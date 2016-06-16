const webpack = require('webpack');

module.exports = {
  entry: {
    app: './themes/gregjs-theme/webpack/app.js',
    archive: './themes/gregjs-theme/webpack/archive.js'
  },
  output: {
    path: './themes/gregjs-theme/source/js',
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
