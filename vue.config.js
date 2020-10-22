module.exports = {
  outputDir: './build',
  publicPath: '',
  devServer: {
    proxy: {
      '^/api': { 
        target: 'http://localhost:3000', 
        changeOrigin: true, 
        secure: false, 
        logLevel: 'debug' 
      },
    }
  },
}