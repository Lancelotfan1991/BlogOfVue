<template>
  <div class='item-list'>
    <div v-for="item in articles" class='item' :key='item.name'>
      <div class='item-name'>
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      articles:[
        {name:"Vue"},
        {name:"React"},
        {name:"Laya"},
        {name:"Js基础"},
        {name:"数据结构"},
        {name:"过往项目"},
        {name:"Webpack"},
        {name:"正则表达式"},
        {name:"Flutter"}
      ]
    }
  }
}
</script>

<style scoped>
  .item-list{
    position: relative;
    padding: 3rem 1.35rem;
    display: flex;
    flex-wrap: wrap;
    transform: rotate(45deg);
    width: 7.5rem;
  }

  .item{
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
    background: orange;
    border: 0.1rem solid white;
    text-align: center;
    line-height: 0.5rem;
    vertical-align: middle;
  }

  .item-name{
    position: absolute;
    text-align: center;
    line-height: 0.5rem;
    vertical-align: middle;
    transform: rotate(-45deg);
    padding-right: 0.3rem;
    top: 0.3rem;
    width: 1.6rem;
  }
</style>