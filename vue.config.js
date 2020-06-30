let HyperDown = require('hyperdown');
let parser = new HyperDown;

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
    config.module.rule('md')
     .test(/\.md/)
     .use('vue-loader')
     .loader('vue-loader')
     .end()
     .use('vue-markdown-loader')
     .loader('vue-markdown-loader/lib/markdown-compiler')
     .options({
      // markdown-it config
      preset: 'default',
      breaks: true,
      raw: true,
      typographer: true,
      preprocess: function(markdownIt, source) {
       return parser.makeHtml(source);//重点在这里！！！
      }
     })
  },
  publicPath:process.env.NODE_ENV === 'production'
  ? "./"
  : '/'     
}
