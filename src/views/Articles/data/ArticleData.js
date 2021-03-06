const ArticleData=[

  {
    type:"RegExp",
    title:"正则表达式",
    articleNames:require.context('markdown/AboutRegExp',false,/\.md$/).keys(),
    articleContent:require.context('markdown/AboutRegExp',false,/\.md$/)
  },
  {
    type:"Webpack",
    title:"Webpack",
    articleNames:require.context('markdown/AboutWebpack',false,/\.md$/).keys(),
    articleContent:require.context('markdown/AboutWebpack',false,/\.md$/)
  },
  {
    type:"Vue",
    title:"Vue",
    articleNames:require.context('markdown/AboutVue',false,/\.md$/).keys(),
    articleContent:require.context('markdown/AboutVue',false,/\.md$/)
  },
  {
    type:"React",
    title:"React",
    articleNames:require.context('markdown/AboutReact',false,/\.md$/).keys(),
    articleContent:require.context('markdown/AboutReact',false,/\.md$/)
  },
  {
    type:"Laya",
    title:"Laya",
    articleNames:require.context('markdown/AboutLaya',false,/\.md$/).keys(),
    articleContent:require.context('markdown/AboutLaya',false,/\.md$/)
  },
  {
    type:"DataStructure",
    title:"数据结构",
    articleNames:require.context('markdown/AboutDataStructure',false,/\.md$/).keys(),
    articleContent:require.context('markdown/AboutDataStructure',false,/\.md$/)
  },
  {
    type:"JS",
    title:"JS基础",
    articleNames:require.context('markdown/AboutJS',false,/\.md$/).keys(),
    articleContent:require.context('markdown/AboutJS',false,/\.md$/)
  },
  {
    type:"Algorithm",
    title:"算法",
    articleNames:require.context('markdown/AboutAlgorithm',false,/\.md$/).keys(),
    articleContent:require.context('markdown/AboutAlgorithm',false,/\.md$/)
  }
]

export default ArticleData;