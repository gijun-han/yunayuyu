var webpack = require('webpack');
module.exports = {
  entry: {
      top: "./src/web/views/top/index.js"
  },
  output: {
    path: "./build/htdocs/js/app/",
    publicPath: "/js/app/",
    filename: "[name].js",
    chunkFilename: "[name].asset.js"
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.html$/, loader: "html" }
    ]
  },
  plugins: [
  ]
}