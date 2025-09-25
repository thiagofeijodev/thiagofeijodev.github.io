import rspack from '@rspack/core';
import path from 'path';

export default {
  entry: path.resolve(process.cwd(), 'src/index.js'),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: 'swc-loader',
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'static/[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new rspack.ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
