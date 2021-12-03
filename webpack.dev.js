const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const ReactRefreshHotPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["react-refresh/babel"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [new ReactRefreshHotPlugin()],
  devServer: {
    devMiddleware: { publicPath: "/build" },
    static: { directory: path.join(__dirname, "src") },
    hot: true,
  },
});
