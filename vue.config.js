/*
*Vue-CLI项目的核心配置文件
*/
const webpack = require("webpack");

module.exports = {
  devServer: {
    // open: process.platform === 'darwin',
    // host: '0.0.0.0',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        pathRewrite: {
          '^/api': ''
        }
        //target: 'http://127.0.0.1:50201'

      }
    }, // 设置代理
    // before: app => {}
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ["popper.js", "default"]
      })
    ],
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
};
