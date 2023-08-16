const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const packageJSON = require("./package.json");

const fileExtensions = [
  "jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"
];

const config = (mode) => {
  const isDevelopment = mode === "development";
  return {
    watch: isDevelopment,
    devtool: isDevelopment ? "inline-source-map" : false,
    mode: mode,
    entry: {
        writeables: path.join(__dirname, "content-scripts", "writeables", "writeables.js"),
        clickables: path.join(__dirname, "content-scripts", "clickables", "clickables.js"),
        crawlerModule: path.join(__dirname, "modules", "crawlerModule.js"),
        background: path.join(__dirname, "background", "background.js"),
        popup: path.join(__dirname, "popup", "popup.js")
     },
    output: {
      path: path.join(__dirname, "build"),
      filename: "[name].bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
          loader: "file-loader",
          options: {
            name: '[name].[ext]'
          },
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: "html-loader",
          exclude: /node_modules/
        },
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
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/manifest.json",
            transform: function(content) {
              const manifestJSON = JSON.parse(content.toString());
              return Buffer.from(
                JSON.stringify({
                  ...manifestJSON,
                  name: packageJSON.name,
                  description: packageJSON.description,
                  version: packageJSON.version,
                  permissions: isDevelopment
                    ? manifestJSON.permissions.concat(["management"])
                    : manifestJSON.permissions
                })
              );
            }
          },
          { from: "src/img/*", to: 'img', flatten: true },
          { from: "src/css/*", to: 'css', flatten: true }
        ]
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "html", "ui.html"),
        filename: "ui.html",
        chunks: ["ui"]
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "html", "test.html"),
        filename: "test.html",
        chunks: ["test"]
      })
    ]
  };
};

module.exports = (env, argv) => config(argv.mode);