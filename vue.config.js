module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 3003,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_HOST,
        changeOrigin: true,
      },
    },
  },
}
