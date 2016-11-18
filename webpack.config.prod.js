var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.css$/, loader: "style!css" }
    ]
  },

  // Create index.html
  plugins: [new HtmlWebpackPlugin()],

  devtool: 'source-map'
};
