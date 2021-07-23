const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dev-dist"), // 输出路径  __dirname是 nodejs的变量，代表当前文件的目录绝对路径
    clean: true,
  },
  devServer: {
    // 必须配置的选项，服务启动的目录，默认为跟目录
    contentBase: path.join(__dirname, "dev-dist"),
    compress: true,
    port: 8888,
    // 使用热加载时需要设置为 true
    hot: true,
    progress: true,
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过设置为 true 进行启用
    historyApiFallback: {
      disableDotRule: true,
    },
    // 出现错误时是否在浏览器上出现遮罩层提示
    overlay: true,
    /**
     * 在 dev-server 的两种不同模式之间切换
     *   默认情况下，应用程序启用内联模式 inline
     *   设置为 false，使用 iframe 模式，它在通知栏下面使用 <iframe> 标签，包含了关于构建的消息
     */
    inline: false,
    // publicPath: "/assets/",
    /**
     * 统计信息，枚举类型，可供选项：
     *      "errors-only": 只在发生错误时输出
     *      "minimal": 只在发生错误或有新的编译时输出
     *      "none": 没有输出
     *      "normal": 标准输出
     *      "verbose": 全部输出
     */
    stats: "errors-only",
    // 设置接口请求代理，更多 proxy 配置请参考 https://github.com/chimurai/http-proxy-middleware#options
    // proxy: {
    //   "/api/": {
    //     changeOrigin: true,
    //     // 目标地址
    //     target: "http://localhost:3000",
    //     // 重写路径
    //     pathRewrite: {
    //       "^/api/": "/",
    //     },
    //   },
    // },
  },
  mode: "development",
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all", 
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // test: /[\\/]node_modules[\\/](react|react-dom|antd)[\\/]/,
          priority: -10,
          name: "vendors",
        },
        // react_vendor:{
        //   // test: /[\\/]node_modules[\\/](react)[\\/]/, //符合组的要求就给构建venders
        //   test:function(module,chunk){
        //     console.log('module',module.resource)
        //     return module.resource &&
        //     module.resource.endsWith('.js') &&
        //     module.resource.includes(`react`);
        //   }, //符合组的要求就给构建venders
        //   priority: -5, //优先级用来判断打包到哪个里面去
        //   name: "react_vendor", //指定chunks名称
        // },
        // react_dom_vendor: {
        //   test: /[\\/]node_modules[\\/](react-dom)[\\/]/, //符合组的要求就给构建venders
        //   priority: -8, //优先级用来判断打包到哪个里面去
        //   name: "react_dom_vendor", //指定chunks名称
        // },
        // antd_vendor: {
        //   test: /[\\/]node_modules[\\/](antd)[\\/]/, //符合组的要求就给构建venders
        //   priority: -8, //优先级用来判断打包到哪个里面去
        //   name: "antd_vendor", //指定chunks名称
        // },
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(le|c)ss$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 处理图片资源 下载 url-loader file-loader
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader", //默认处理不了html中img图片
        options: {
          limit: 8 * 1024, // 图片大小小于8kb，就会被base64处理，优点: 减少请求数量（减轻服务器压力）， 缺点：图片体积会更大（文件请求速度更慢）
          name: "[hash:10].[ext]", // 给图片进行重命名， [hash:10]取图片的hash的前10位， [ext]取文件原来扩展名
          esModule: false, // 关闭es6模块化，
          //问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs，解析时会出问题：[object Module]，
          //解决：关闭url-loader的es6模块化，使用commonjs解析
          outputPath: "imgs",
          publicPath: "./imgs", //没有这个会报错，Error: Automatic publicPath is not supported in this browser
        },
      },
      {
        //处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)/, //除了html|js|css|less|jpg|png|gif以外的资源
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "static",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __BROWSER__: JSON.stringify(true),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: "./src/index.html",
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 8889,
      openAnalyzer: false,
    }),
    // new webpack.ProvidePlugin({
    //   react: "React",
    //   "react-dom": "ReactDOM",
    // }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
});
