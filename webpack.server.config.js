const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ssr.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "./server-dist"),
    filename: "index.js",
    library: {
      type: "commonjs2"
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            babelrc: false
          }
        },
      },
      {
        // 忽略掉 CSS 文件
        test: /\.(less|css|sass)$/,
        use: ['ignore-loader'],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["build:server"],
    }),
  ],
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  }
};
