var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.css$/, loader: "style!css" }
    ]
  },

  // Create index.html
  plugins: [new HtmlWebpackPlugin()],

  devtool: 'eval-source-map'
};
