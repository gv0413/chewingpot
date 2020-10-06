module.exports = {
  outputDir: '../en-c-1/back/public',
  publicPath: '',
  devServer: {
    proxy: {
      '^/api': { 
        target: 'http://localhost:3000', 
        changeOrigin: true, 
        secure: false, 
        pathRewrite: {
          '^/api': '/'
        }, 
        logLevel: 'debug' 
      },
    }
  },
}