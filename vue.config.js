// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/web',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 3003,
    proxy: {
      '/api/v2/ekuiper': {
        target: 'http://localhost:9081',
        changeOrigin: true,
        pathRewrite: {
          '/api/v2/ekuiper': '/',
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
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      },
    },
  },
}
