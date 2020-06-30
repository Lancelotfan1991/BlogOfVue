<template>
  <div class='chartPage'>
    Vue响应式源码
    <div class='markdown-container'>
      <VueReactive class='markdowns'/>
    </div>
    <BackTop/>
  </div>
  
</template>

<script>
import BackTop from 'components/common/backTop/BackTop'

import VueReactive from 'markdown/Front-end/Vue响应式源码.md'

export default {
  components:{
    VueReactive,
    BackTop
  }
}
</script>

<style scoped>
  .chartPage{
    font-size: 0.28rem;
    font-weight: bolder;
  }

  .markdown-container{
    font-family: 'monospace','monospace';
    background-color: #f6f6f6;
    color: black;
    padding: 1rem 0.5rem 1rem 0.5rem;
  }

  .markdowns{
    overflow-x: auto;
  }
</style>