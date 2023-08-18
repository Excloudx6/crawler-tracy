const path = require("path");
const webpack = require("webpack");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const packageJSON = require("./package.json");

const config = (mode) => {
  const isDevelopment = mode === "development";
  return {
    watch: isDevelopment,
    devtool: isDevelopment ? "inline-source-map" : false,
    mode: mode,
    entry: {
        writeables: path.join(__dirname, "build", "writeables.bundle.js"),
        clickables: path.join(__dirname, "build", "clickables.bundle.js"),
        crawlerModule: path.join(__dirname, "build", "crawlerModule.bundle.js"),
        background: path.join(__dirname, "build", "background.bundle.js"),
        popup: path.join(__dirname, "build", "popup.bundle.js")
      },
    output: {
      path: path.join(__dirname, "build"),
      filename: "[name].bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.js']
    },
    plugins: [
      // Uncomment if you want to analyze your bundles
      // new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({
        DEV: isDevelopment
      }),
    ]
  };
};

module.exports = (env, argv) => config(argv.mode);
