<template>
  <div class='blog'>
    <CommonHeader></CommonHeader>
    <keep-alive exclude="ArticleList,ArticleDetail">
      <router-view path='/'></router-view>
    </keep-alive>
    
    <TabBar/>
  </div>
</template>

<script>
import CommonHeader from 'components/common/header/Header.vue';
import TabBar from 'components/common/tabBar/TabBar'

export default {
  name: 'App',
  components: {
    CommonHeader,
    TabBar
  },
  mounted(){

  }
}
</script>

<style>
  @import url('assets/css/base.css');
  @import url('//at.alicdn.com/t/font_1926555_6lytyfi423j.css');

  html{
    font-size: calc(100vw / 7.5);
    font-family: "Noto Sans SC";
  }

  body{
    position: relative;
    width: 7.5rem;
    font-size: 0.26rem;
  }

  .iconfont{
    font-size: calc(100vw / 7.5);
  }

  /* .iconfont:hover{
    border: 20px solid;
    border-radius: 50%;
    border-color: #cccccc;
    color: #000;
  } */
</style>
