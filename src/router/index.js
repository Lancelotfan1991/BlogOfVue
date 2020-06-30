import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 在引用vue-router的页面添加一段代码
 
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Home=()=>import('../views/Home/Home');
const Detail=()=>import('../views/Detail/Detail');
const ArticleCenter=()=>import('../views/ArticleCenter/ArticleCenter');
const Statistics=()=>import('../views/Statistics/Statistics.vue');
const About=()=>import('../views/About/About');
const routes=[
  {
    path:'',
    redirect:"/ArticleCenter"
  },
  {
    path:"/Home",
    component:Home
  },
  {
    path:"/Detail",
    component:Detail
  },
  {
    path:"/Statistics",
    component:Statistics
  },
  {
    path:"/About",
    component:About
  },
  {
    path:"/ArticleCenter",
    component:Detail
  }
]

const router=new VueRouter({
  routes,
  mode:"history"
})

export default router