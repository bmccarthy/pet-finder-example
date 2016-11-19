var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: "source-map",

  entry: {
    "vendor": "./vendor.js",
    "polyfills": "./polyfills.js",
    "app": "./app/app.js"
  },

  resolve: {
    modules: ["./node_modules", "./app"]
  },

  module: {
    loaders: [
      // pass all javascript files through babel and ng-annotate
      { test: /\.js$/, exclude: [/node_modules/], loader: "ng-annotate!babel" },
      // pass html files through html loader
      { test: /\.html$/, loader: "html" },
      // add loaders specifically for bootstrap css
      { test: /\.(png|jpe?g|gif)$/, loader: "file?name=[path][name].[hash].[ext]&context=./" },
      { test: /\.css$/, exclude: "./app/css", loader: ExtractTextPlugin.extract("style", "css?sourceMap") },
      { test: /\.css$/, include: "./app/css", loader: ExtractTextPlugin.extract("style", "css?sourceMap") },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },

  output: {
    path: "./dist",
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },

  plugins: [
    // don't duplicate chunks.  Dont want to load angular twice
    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "vendor"]
    }),

    new ExtractTextPlugin("[name].css"),

    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body"
    })
  ],

  devServer: {
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
