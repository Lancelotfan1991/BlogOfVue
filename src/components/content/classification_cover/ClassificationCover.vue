<template>
  <div class='article-description'>
    <img class='cover' src="" alt="">
    <div class='keywords'>
      <p v-for="item in keywords" :key="item">{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    keywords:{
      type:Array,
      required:true
    },
    cover:{
      type:Array,
      required:false
    }
  }
}
</script>

<style scoped>
  .article-description{
    position: relative;
    width: 120px;
    height: 150px;
    margin: 5px 5px 5px 0;
    border-radius: 10px;
    background-color: #ffffff;
    border: 1px solid #ccc;
  }

  .cover{
    position: absolute;
  }

  .keywords{
    position: absolute;
    text-align: right;
    padding: 10px;
    bottom: 0;
    width: 100%;
  }

</style>