import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

/********** 引用ElementUI组件库 *****************/
import { Button, Select, Option, DatePicker, Badge, Row } from 'element-ui'
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Badge);
Vue.use(DatePicker);
Vue.use(Row);

/*********Echarts 用于绘制图表(按需引入方式) *******/
import ECharts from 'vue-echarts'

Vue.component('v-chart',ECharts);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
