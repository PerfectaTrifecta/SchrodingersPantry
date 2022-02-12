const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, './client/index.tsx'),
  devtool: 'inline-source-map',
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
         resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
         },
      },
      { 
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        use: ["babel-loader"] 
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "client/src/index.html"),
    }),
  ]
};