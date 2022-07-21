const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const childProcess = require('child_process');

const isDevelopment = process.env.NODE_ENV !== 'production';
const removeNewLine = lines => lines.toString().replace('\n', '');

module.exports = {
  name: 'Dott-react-boilerplate',
  entry: { app: path.join(__dirname, '..', 'src', 'index.tsx') },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
  },

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
          plugins: [
            'babel-plugin-styled-components',
            isDevelopment && require.resolve('react-refresh/babel'),
          ].filter(Boolean),
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
      {
        test: /\.(jpe?g|gif|png|webp|bmp|svg|ttf|woff)$/,
        type: 'assets/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'public', 'index.html'),
      base: '/',
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
    // BannerPlugin 빌드시 상단에 빌드 시점 빌드한사람 정보 주석으로 기입
    new webpack.BannerPlugin({
      banner: `
      Build Date :: ${new Date().toLocaleString()}
      Commit Version :: ${removeNewLine(
        childProcess.execSync('git rev-parse --short HEAD'),
      )}
      Auth.name :: ${removeNewLine(
        childProcess.execSync('git config user.name'),
      )}
      Auth.email :: ${removeNewLine(
        childProcess.execSync('git config user.email'),
      )}
      `,
    }),
  ],
};
