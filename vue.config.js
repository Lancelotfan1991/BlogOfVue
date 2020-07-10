module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'network':'@/network',
        'views':"@/views",
        'markdown':"@/markdown"
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
  },
  publicPath:process.env.NODE_ENV === 'production'
  ? "./"
  : '/'     
}
