import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VConsole from 'vconsole'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor);

import requireComponent from './utils/reg'//导入全部的基础组件，方便之后在项目中直接使用

Vue.config.productionTip = false

var app=new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

if(process.env.NODE_ENV == 'production'){
  new VConsole();
}
