let path = require('path');
let nodeExternals = require('webpack-node-externals');
let webpack = require('webpack'); //to access built-in plugins

module.exports = {
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'axios': 'axios'
  },
  entry: {
    you: path.resolve(__dirname, "views/you.page.js"),
    logout: path.resolve(__dirname, "views/logout.page.js")
  },
  output: {
    path: path.resolve(__dirname, "pages/js"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
