import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home=()=>import('../views/Home/Home');
const Detail=()=>import('../views/Detail/Detail');
const ArticleCenter=()=>import('../views/ArticleCenter/ArticleCenter');
const Statistics=()=>import('../views/Statistics/Statistics.vue');
const About=()=>import('../views/About/About');
const routes=[
  {
    path:'',
    redirect:"/Detail"
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
    component:ArticleCenter
  }
]

const router=new VueRouter({
  routes,
  mode:"history"
})

export default router