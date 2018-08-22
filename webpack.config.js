const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: ['src', "node_modules"],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
        {
            test: /\.jsx?$/,
            use: [
              'babel-loader'
            ],
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ],
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {test: /\.(png|gif|jpg)(\?.*$|$)/, loader: 'url-loader?limit=8192&name=images/[hash].[ext]'},
        {test: /\.(json)(\?.*$|$)/, loader: 'json-loader'},
        {test: /\.(html)(\?.*$|$)/, loader: 'html-loader'},
        // Font Definitions
        {test: /\.(svg)(\?.*$|$)/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]'}
    ],
},
  plugins: [
      new HtmlWebpackPlugin({
          template: 'static/index.html'
      })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};