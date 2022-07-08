const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 3003,
    proxy: {
      '/eKuiper/api': {
        target: 'http://localhost:9081',
        changeOrigin: true,
        pathRewrite: {
          '/eKuiper/api': '/',
        },
      },
      '/api': {
        target: process.env.VUE_APP_HOST,
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      // extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      },
    },
  },
}
