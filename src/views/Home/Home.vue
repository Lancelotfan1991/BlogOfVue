<template>
  <div>
    <img class='headimg' src="~assets/image/home/headimg.jpg" alt="">
    <div class='my-title'>
      <p>欢迎!</p>
      <p>你可以在此选择查看感兴趣的内容</p>
      <p>以下是所有可被选择的标签</p>
    </div>
    <div class='tag-list'>
      <van-row type='flex' justify='space-around'>
        <van-col span="7" @click="$router.push('/ArticleList/Vue')"><p>Vue</p></van-col>
        <van-col span="7" @click="$router.push('/ArticleList/React')"><p>React</p></van-col>
        <van-col span="7" @click="$router.push('/ArticleList/Laya')"><p>Laya</p></van-col>
      </van-row>
      <van-row type='flex' justify='space-around'>
        <van-col span="7" @click="$router.push('/ArticleList/JS')"><p>JS基础</p></van-col>
        <van-col span="15"  @click="$router.push('/ArticleList/DataStructure')"><p>数据结构</p></van-col>
      </van-row>
      <van-row type='flex' justify='space-around'>
        <van-col span="7" @click="$router.push('/ArticleList/RegExp')"><p>正则表达式</p></van-col>
        <van-col span="7" @click="$router.push('/ArticleList/Webpack')"><p>Webpack</p></van-col>
        <van-col span="7"><p>案例</p></van-col>
      </van-row>
      <van-row type='flex' justify='space-around'>
        <van-col span="15" @click="$router.push('/ArticleList/Algorithm')"><p>算法</p></van-col>
        <van-col span="7"><p>游戏</p></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Col, Row } from 'vant';

Vue.use(Col);
Vue.use(Row);

export default {
  data(){
    return {}
  }
}
</script>

<style scoped>
  .headimg{
    margin: 2rem 1.5rem 0 1.5rem;
    width: 4.5rem;
    border-radius: 50%;
  }

  .my-title{
    padding: 0.5rem;
    text-align: center;
    font-size: 0.4rem;
    line-height: 0.5rem;
  }

  .tag-list{
    padding: 0 0.5rem;
    text-align: center;
  }
  
  .tag-list p{
    background-color: red;
    font-size: 0.3rem;
    height: 0.7rem;
    line-height: 0.7rem;
    vertical-align: middle;
    margin-top: 0.1rem;
    background-color: #39a9ed;
    font-weight: bolder;
    color: white;
  }

</style>