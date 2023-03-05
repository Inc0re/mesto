// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: { main: './src/js/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,

    open: false,
  },
  module: {
    rules: [
      {
        // REGEX to search for JS files
        test: /\.js$/,
        // Use babel-loader to transpile JS files
        use: 'babel-loader',
        // Exclude node_modules folder
        exclude: '/node_modules/',
      },
      {
        // REGEX to search for images and fonts
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        // Use rule for .css files
        test: /\.css$/,
        // Use MiniCssExtractPlugin.loader, css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to index.html file
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
