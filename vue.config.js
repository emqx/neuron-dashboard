// vue.config.js
module.exports = {
  publicPath: './',
  devServer: {
    port: 3003,
    proxy: {
      '/api/v1/': {
        target: 'http://52.53.170.189:7000',
        changeOrigin: true,
      },
    },
  },
}
