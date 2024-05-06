/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge({
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'public/index.html'),
      filename: path.join(__dirname, '..', 'dist/index.html'),
    }),
  ],
  devServer: {
    port: 3001,
    static: path.join(__dirname, '..', 'public'),
    historyApiFallback: true,
    host: '0.0.0.0',
  },
}, common)
