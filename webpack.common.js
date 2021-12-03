const path = require("path");

module.exports = {
  name: "Random Color Palette",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./src/index",
  },
  output: {
    path: path.resolve(__dirname + "/build"),
    publicPath: "/build/",
    filename: "app.js",
  },
};
