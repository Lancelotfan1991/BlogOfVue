<template>
  <div class='article-bg'>
    <img :src="img" alt="">
    <div class='article-title'>
      <p>{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:"ArticleCover",
  props:{
    img:{
      type:String,
      default:"",
      required:true
    },
    title:{
      type:String,
      default:"默认标题",
      required:true
    }  
  }
}
</script>

<style scoped>
  .article-bg{
    position: relative;
    width: 200px;
    height: 150px;
    border-radius: 10px;
    margin: 5px 5px 5px 0px;
    flex: 1;
  }

  .article-bg img{
    display: block;
    width: 200px;
    height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
  }

  .article-title{
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 30px;
    text-align: right;
    
  }

  .article-title p{
    margin-right: 10px;
    color: white;
  }
</style>