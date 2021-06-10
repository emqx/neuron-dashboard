// vue.config.js
module.exports = {
  publicPath: './',
  devServer: {
    port: 3003,
    proxy: {
      '/api/v1/': {
        target: 'http://iot-platform.cloud:6700',
        changeOrigin: true,
      },
    },
  },
}
