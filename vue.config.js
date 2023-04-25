// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const { VUE_APP_SUB_APP = true } = process.env

let publicPath = '/web'
const name = 'neuron-2.4.6'
if (VUE_APP_SUB_APP) {
  publicPath = '/integration/neuron/v2.4.6/'
}

module.exports = {
  publicPath,
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
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      // 必须打包成一个库文件
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
  chainWebpack: (config) => {
    config.module.rule('fonts').use('url-loader').loader('url-loader').options({}).end()
    config.module.rule('images').use('url-loader').loader('url-loader').options({}).end()
  },
}
