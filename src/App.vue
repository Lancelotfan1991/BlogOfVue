<template>
  <div class='blog'>
    <CommonHeader></CommonHeader>
    <router-view path='/'></router-view>
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
  html{
    font-size: calc(100vw / 7.5);
    font-family: "Noto Sans SC";
  }

  body{
    position: fixed;
    width: 7.5rem;
    font-size: 0.26rem;
  }
</style>
