var webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

var BUILD_DIR = path.resolve(path.join(__dirname, '/dist'));

module.exports = merge(common,
  {
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
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin()
    ]
  }
);
