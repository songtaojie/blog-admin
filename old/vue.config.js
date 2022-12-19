module.exports = {
  publicPath: '/admin/',
  // lintOnSave: 'error',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/scss/variable.scss";'
      }
    }
  },
  devServer: {
    // public:'127.0.0.1:8082'
    open: process.env.NODE_ENV === 'development',
    // host: '127.0.0.1',
    port: 8091
    // proxy: {
    //   'api/*': {
    //     target: 'http://localhost:52909/',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {}
    //   }
    // }
  }
}
