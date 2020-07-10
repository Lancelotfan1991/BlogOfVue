<template>
  <div class='common-header'>
    <p class='blog-name'>凡事</p>
    <img class='drawer' v-show="false" src="~assets/image/drawer.png" alt="">
  </div>
</template>

<script>
export default {
  name:"CommonHeader",
}
</script>

<style scoped>
.common-header{
    position: fixed;
    background-color: orange;
    top:0;
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    line-height: 50px;
    text-align: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 2px 2px 2px #ccc;
    z-index: 2000;
  }

  .blog-name{
    margin-left: 10px;
  }

  .drawer{
    display: inline-block;
    width: 33px;
    height: 30px;
    margin: 10px 10px;
  }
</style>