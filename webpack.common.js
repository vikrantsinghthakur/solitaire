var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WriteFileWebpackPlugin = require('write-file-webpack-plugin');

var BUILD_DIR = path.resolve(path.join(__dirname, '/dist'));
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: path.resolve(APP_DIR,'index.jsx'),
  output: {
    path: BUILD_DIR,
    filename: 'public/bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test : /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test : /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve : {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
      new CopyWebpackPlugin([{from: 'src/client/index.html'},{from:'src/client/app/assets', to:'./assets'}])
  ]
}

module.exports = config;
