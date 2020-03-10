const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true
  }
});
