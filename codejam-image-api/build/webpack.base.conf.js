const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = {
  // BASE config
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: ['babel-loader', 'eslint-loader'],
      exclude: '/node_modules/',
    }, {
      test: /\.(png|jpg|gif|svg|ico|jpeg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: `${PATHS.src}/js/postcss.config.js`,
            },
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: `${PATHS.src}/js/postcss.config.js`,
            },
          },
        },
      ],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
    }),
    new CopyWebpackPlugin([{
      from: `${PATHS.src}/img`,
      to: `${PATHS.assets}img`,
    },
    {
      from: `${PATHS.src}/static`,
      to: '',
    },
    ]),
    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: {
        plugins: [
          ['gifsicle', {
            interlaced: true,
          }],
          ['jpegtran', {
            progressive: true,
          }],
          ['optipng', {
            optimizationLevel: 5,
          }],
          [
            'svgo',
            {
              plugins: [{
                removeViewBox: false,
              }],
            },
          ],
        ],
      },
    }),
  ],
};
