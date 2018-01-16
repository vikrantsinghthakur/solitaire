var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WriteFileWebpackPlugin = require('write-file-webpack-plugin');
var webpack = require('webpack');


var BUILD_DIR = path.resolve(__dirname, 'src/client/dist');
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
      }
    ]
  },
  resolve : {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 9000,
    hot: true
  },
  plugins : [
    new WriteFileWebpackPlugin({
          test: /^(?!.*(hot)).*/,
    }),
    new CopyWebpackPlugin([{from: 'src/client/index.html'},{from:'src/client/app/assets', to:'./assets'}]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
