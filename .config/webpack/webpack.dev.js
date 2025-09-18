/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common')

const config = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(process.cwd(), 'docs'),
    filename: "index_bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'public/index.html'),
      inject: 'body',
    }),
  ],
  devServer: {
    port: 3001,
    static: path.join(process.cwd(), 'docs'),
    historyApiFallback: true,
    host: '0.0.0.0',
    open: true,
    hot: true,
  },
});

module.exports = config;
