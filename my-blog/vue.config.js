const path = require("path");
const CompressionPlugin = require('compression-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: '',

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()
      // 按需打包lodash函数
      // config.plugin('lodash-webpack-plugin').use(require('lodash-webpack-plugin'))
      // 代码压缩plugin

    }
    //停止prefetch偷偷静默加载
    config.plugins.delete('prefetch')
    //压缩代码
    config.optimization.minimize(true)
    config.externals({
      'wangeditor': 'wangEditor',
      // 'vue': 'Vue'
    })
    //路径别名
    config.resolve.alias
      .set("@", resolve("src"))
      // .set("assets", resolve("src/assets"))
      // .set("components", resolve("src/components"))
      // .set("views", resolve("src/views"))
    // .set("base", resolve("baseConfig"))
    // .set("public", resolve("public")); esLint
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
            algorithm: 'gzip',
            threshold: 10240,
            deleteOriginalAssets: false,
          })
        ]
      }
    }
  }
}