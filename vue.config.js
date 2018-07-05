module.exports = {   
  devServer: {
     proxy: 'http://localhost:3000' 
    }
}

/*
devServer: {
    historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      port: 8080,
      host: '0.0.0.0',
      proxy: {
      '/*': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },

   devServer: {
        proxy: 'http://localhost:3000/'
      }
  */