<template>
  <div class='detail-page'>
    <div>
      <h2 class='title'>此目录下为{{pageTitle}}相关笔记</h2>
      <div class='name-list' v-for="(item,index) in articleNameList" @click="goDetail(index)" :key="index">
        {{item}}
      </div>
      <div class='no-content' v-if="articleNameList.length==0">暂无笔记收录</div>
    </div>
  </div>
</template>

<script>
import ArticleData from './data/ArticleData'

export default {
  name:"ArticleList",
  data(){
    return {
      type:"",
      pageTitle:"",
      articleNameList:[],
    }
  },
  components:{

  },
  mounted(){
    this.type=this.$route.params.type;
    this.getPageInfo();
  },
  methods:{
    getPageInfo(){
      
      for(let i=0;i<ArticleData.length;i++){
        
        if(ArticleData[i].type==this.type){
          this.pageTitle=ArticleData[i].title;
          this.articleNameList=ArticleData[i].articleNames;
          return;
        }
      }
    },
    goDetail(index){
      this.$router.push("/ArticleDetail/"+this.type+"/"+index);
    }
  }
}
</script>

<style scoped>
  .detail-page{
    font-size: 0.32rem;
    font-weight: bolder;
    padding: 1.2rem 0.3rem;
  }

  .name-list{
    border:1px solid blue;
    padding: 0.1rem;
    margin: 0.15rem;
  }

  .name-list:hover{
    background: orange;
    color: white;
  }
</style>
