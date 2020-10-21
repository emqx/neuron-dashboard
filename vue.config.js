// vue.config.js
module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api/v1/': {
        target: 'http://52.53.170.189:7000',
        changeOrigin: true,
      },
    },
  },
}
