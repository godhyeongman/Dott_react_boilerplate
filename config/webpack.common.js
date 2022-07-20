const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  name: 'Dott-react-boilerplate',
  entry: { app: path.join(__dirname, '..', 'src', 'index.tsx') },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'],
    alias: { '@': path.resolve(__dirname, '..', 'src') },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['> 0.2% in KR, not dead'] },
                debug: true,
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
              },
            ],
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript',
          ],
          plugins: ['babel-plugin-styled-components'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'public', 'index.html'),
      base: '/',
    }),
    new Dotenv(),
  ],
};
