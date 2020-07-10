import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 在引用vue-router的页面添加一段代码
// 用于捕获异常，从而避免出现一些router的报错 
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Home=()=>import('../views/Home/Home');
const ArticleList=()=>import('../views/Articles/ArticleList');
const ArticleDetail=()=>import('../views/Articles/ArticleDetail');
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
    path:"/ArticleList/:type",
    component:ArticleList
  },
  {
    path:"/ArticleDetail/:type/:id",
    component:ArticleDetail
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
  mode:"hash"
})

export default router