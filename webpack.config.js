const webpack = require('webpack');
const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'Dott-react-boilerplate',
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  entry: {
    app: ['./src/index'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              { targets: { browsers: ['> 1% in KR, not dead'] }, debug: true },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: ['react-refresh/babel'],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new RefreshWebpackPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    // }),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/',
  },
  devServer: {
    // devMiddleware: { publicPath: '/' }, // devMiddleware의 publicPath는  빌드된 파일 넣는곳
    static: { directory: path.resolve(__dirname, 'public') }, // static은 빌드되기 전 파일이 있는 곳
    hot: true,
  },
};
