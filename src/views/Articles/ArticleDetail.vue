<template>
  <div class='markdown-container'>
    <MavonEditorModule :content='articleDetail'/>
    
    <div class='icon-area'>
      <!-- <BaseBackTop/> -->
      <BasePreviousButton class='item' v-show="showPrevious" @click.native="goPage(-1)"/>
      <BaseReturnButton class='item' @click.native="goBack"/>
      <BaseNextButton class='item' v-show="showNext"  @click.native="goPage(1)"/>
    </div>
    
  </div>
</template>

<script>
import ArticleData from './data/ArticleData'
import MavonEditorModule from './childViews/MavonEditorModule'

export default {
  name:'ArticleDetail',
  data(){
    return {
      articleDetail:"",
      showPrevious:true,
      showNext:true,
      maxLength:0,
      currentPage:0,
    }
  },
  mounted(){
    this.getContent();
  },
  components:{
    MavonEditorModule
  },
  watch: {
    '$route' (to, from ) { 
      //监听路由是否变化
      if(this .$route. params .id){
          this.getContent();
        }
    }
  },
  methods:{
    goBack(){
      this.$router.push('/ArticleList/'+this.$route.params.type);
    },
    goPage(index){
      this.$router.push({
        params:{
          type:this.$route.params.type,
          id:parseInt(this.$route.params.id)+index
        }
      })
    },
    getContent(){
      let type=this.$route.params.type;
      let index=this.$route.params.id;
      this.currentPage=index;

      ArticleData.forEach(ele=>{
        if(ele.type==type){
          let names=ele.articleNames;
          this.maxLength=names.length;
          //判断按钮的显示和隐藏
          this.showPrevious=!names.length==0 && index!=0;
          this.showNext=!names.length==0 && index !=ele.articleNames.length-1;

          this.articleDetail=ele.articleContent(ele.articleNames[index]);
        }
      });
    }
  }
}
</script>

<style scoped>
  .markdown-container{
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }

  .icon-area{
    position: fixed;
    display: flex;
    justify-content: space-evenly;
    left: 0rem;
    right: 0rem;
    bottom: 1.2rem;
    text-align: center;
    font-size: 0.24rem;
    color: red;
    z-index: 1501;
  }

  .item{
    flex: 1;
    width: 0.8rem;
    height: 0.8rem;
    transform: scale(0.7,0.7);
  }
</style>