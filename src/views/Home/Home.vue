<template>
  <div class='center'>
    <div class='article-item' v-for='(item,index) in articleList' :key='index'>
      <p class='article-item-name'>{{item.tab}}</p>
      <div class='article-content'>
        <div class='left-part'>
          <ClassificationCover :keywords="item.keywords"/>
        </div>
        <div class='right-part'>
          <ArticleCover @click='goDetail' v-for="(listitem,index) in item.list" :key="index" :img='listitem.image' :title="listitem.title"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCover from 'components/content/article_cover/ArticleCover'
import ClassificationCover from 'components/content/classification_cover/ClassificationCover'
export default {
  data(){
    return {
      articleList:[
        {
          tab:"最新",
          list:[
            {image:"article/MaltaEurope.jpg",title:"电子表格",link:"",date:""},
            {image:"article/The Empress.jpg",title:"标题1",link:"",date:"2019-04-15"},
            {image:"article/Campo de girasoles.jpg",title:"标题2",link:"",date:"2019-04-15"}
          ],
          keywords:['正则表达式',"ElementUI"]
        },
        {
          tab:"前端",
          list:[
            {image:"article/Ban Gioc Falls.jpg",title:"标题1",link:"",date:"2019-04-15"},
            {image:"article/Campo de girasoles.jpg",title:"标题2",link:"",date:"2019-04-15"}
          ],
          keywords:['Vue2.0',"小程序","HTML5","Flutter"]
        },
        {
          tab:"游戏",
          list:[
            {image:"article/Campo de girasoles.jpg",title:"标题1",link:"",date:"2019-04-15"},
            {image:"article/Campo de girasoles.jpg",title:"标题2",link:"",date:"2019-04-15"}
          ],
          keywords:['Unity',"LayaAir"]
        },
        {
          tab:"个人案例库",
          list:[
            {image:"article/The Empress.jpg",title:"标题1",link:"",date:"2019-04-15"},
            {image:"article/Campo de girasoles.jpg",title:"标题2",link:"",date:"2019-04-15"}
          ],
          keywords:['小程序',"SPA站点","H5游戏"]
        }, 
        {
          tab:"收藏夹",
          list:[
            {image:"article/The Empress.jpg",title:"标题1",link:"",date:"2019-04-15"},
            {image:"article/Campo de girasoles.jpg",title:"标题2",link:"",date:"2019-04-15"}
          ],
          keywords:['移动端案例',"精美H5"]
        },
        {
          tab:"关于本博客",
          list:[
            {image:"article/The Empress.jpg",title:"技术",id:"",date:"2019-04-15"},
            {image:"article/The Empress.jpg",title:"代码和风格指南",id:"",date:"2019-04-15"}
          ],
          keywords:['技术','风格指南']
        }
      ]
    }
  },
  components:{
    ArticleCover,
    ClassificationCover,
    // StyleMD
  },
  methods:{
    goDetail(id){
      this.$router.push('/detail');
    }
  }
}
</script>

<style scoped>
  .center{
    position: relative;
    height: 100vh;
    padding-top: 50px;
    padding-bottom: 50px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .article-item{
    display: block;
    margin-top: 20px;
    margin-left: 20px;
  }

  .article-item-name{
    font-size: 20px;
    text-align: left;
  }

  .article-content{
    overflow-x: scroll;
    display: flex;
    flex-shrink: 1;
  }

  .left-part{
    display: flex;
  }

  .right-part{
    display: flex;
  }
</style>