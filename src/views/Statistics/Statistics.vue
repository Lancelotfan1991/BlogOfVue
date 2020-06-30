<template>
  <div class='statistics'>
    <p class='module-name'>数据分析</p>

    <EchartDoughnut/>
  </div>
</template>

<script>
import EchartDoughnut from 'components/content/echart/Echart_Doughnut'

export default {
  components:{
    EchartDoughnut,
  }
}
</script>

<style scoped>
  .statistics{
    padding-top: 1rem;
    padding-left: 0.2rem;
  }
</style>