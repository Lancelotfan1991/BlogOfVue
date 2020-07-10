<template>
  <div class='echart-container'>
    <v-chart :options="option"></v-chart>
  </div>
</template>

<script>
import Vue from 'vue';
/*********Echarts 用于绘制图表(按需引入方式) *******/
import ECharts from 'vue-echarts'

Vue.component('v-chart',ECharts);

import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  data(){
    return {
      option : {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                ]
            }
        ]
    }

    }
  }
}
</script>

<style>
  .echart-title{
    margin: 10px;
    text-align: center;
    font-size: 26px;
  }

  /**
  * The default size is 600px×400px, for responsive charts
  * you may need to set percentage values as follows (also
  * don't forget to provide a size for the container).
  */
  .echarts {
    width: 375px;
    height: 300px;
    margin: 0 auto;
  }
</style>