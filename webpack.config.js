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
      writeables: './content-scripts/writeables/writeables.js', // Update this path
      clickables: './content-scripts/clickables/clickables.js', // Update this path
      crawlerModule: './modules/crawlerModule.js', // Update this path
      background: './background-wrapper.js',
      popup: './popup/popup.js' // Update this path
    },
    
    
    output: {
      path: path.join(__dirname, "build"),
      filename: "[name].bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
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
