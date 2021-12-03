const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: { minimize: true },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
});
