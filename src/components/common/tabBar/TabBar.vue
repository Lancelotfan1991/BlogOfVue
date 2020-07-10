<template>
  <div class='tabbar'>
    <div @click="$router.push('/Home')" class='item'>首页</div>
    <div @click="$router.push('/ArticleCenter')" class='item'>文章</div>
    <div @click="$router.push('/Statistics')" class='item'>统计</div>
    <div @click="$router.push('/About')" class='item'>关于</div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .tabbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 0.88rem;
    line-height: 0.88rem;
    justify-content: space-between;
    font-size: 0.32rem;
    text-align: center;
    background-color: white;
    
    box-shadow: 0 -2px 2px 2px rgba(0,0,0,.1);
    z-index: 2000;
  }

  .item{
    
    width: 25%;
    text-align: center;
    
  }
</style>