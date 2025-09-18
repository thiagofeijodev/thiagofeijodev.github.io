/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');
const { WebpackAssetsManifest } = require('webpack-assets-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(process.cwd(), 'docs'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'public/index.html'),
      filename: path.join(process.cwd(), 'docs/index.html'),
      inject: 'body',
    }),
    new FaviconsWebpackPlugin({
      logo: './public/logo.png',
      cache: true,
      inject: true,
      mode: 'webapp',
      manifest: './public/manifest.json',
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
    }),
    new WebpackAssetsManifest({}),
    new WorkboxPlugin.GenerateSW()
  ],
})
