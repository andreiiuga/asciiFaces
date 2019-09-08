const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "index.html"
});

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    path.resolve('src/index.js')
  ],
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['es2015', 'react', 'stage-3']
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader"
        },
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("dev"),
      "process.env.HOSTNAME": JSON.stringify("http://localhost:3000")
     }),
  ],
  devServer: {
    contentBase: path.resolve('public'),
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
};