const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  target: "web",
  output: {
    path: path.resolve(__dirname, "./client-dist"),
    filename: "index.js",
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
    },
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              [
                "import",
                {
                  "libraryName": "antd",
                  "style": "css"
                }
              ]
            ]
          }
        },
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: process.env.NODE_ENV === "development" ? "[local]_[hash:base64:5]" : "[hash:base64]",
                mode: (resourcePath) => {
                  if (/pure.css$/i.test(resourcePath)) {
                    return "pure";
                  }

                  if (/global.css$/i.test(resourcePath) || /node_modules/.test(resourcePath)) {
                    return "global";
                  }

                  return "local";
                },
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new HtmlWebpackPlugin({
      filename: "client.html",
      template: "./src/template.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  }
};
