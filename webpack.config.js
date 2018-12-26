let path = require('path');
let nodeExternals = require('webpack-node-externals');
let webpack = require('webpack'); //to access built-in plugins

module.exports = {
  watch: true,
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  entry: {
    index: path.resolve(__dirname, "views/index.page.js")
  },
  output: {
    path: path.resolve(__dirname, "pages"),
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
