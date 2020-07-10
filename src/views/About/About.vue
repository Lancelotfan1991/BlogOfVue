<template>
  <div class='about-page'>
    <!-- <div class='page-title'>关于</div> -->
    <div class='module'>
      <div class='module-title'>*关于此博客:</div>
      <p>1，框架：VueCLI。</p>
      <p>2，VueRouter；</p>
      <p>3，文章部分使用了Markdown-it-vue结合Markdown-loader以及html-loader;</p>
      <p>4，表格部分使用了Echarts；</p>
      <p>5，部分UI库采用了Vant/ElementUI；</p>
      <p>6，目前尚未搭建服务器，尝试使用搭建node.js服务器中；</p>
      <p>7，博客已开源。开源地址:https://lancelotfan1991.github.io</p>
    </div>
    <div class='module'>
      <div class='module-title'>*关于博客作者:</div>
      <p>1，樊星城，前端工作者，游戏开发;</p>
      <p>2，主要技术栈包括：Vue，React，JS，TS，Laya，Playcanvas以及部分Unity等。</p>
      <p>3，业余爱好：游戏制作，漫画。</p>
      <p>4，如果你在文章中发现任何错误，可以在git上issue或者邮箱告知：lancelotfan@126.com;</p>
    </div>
    <div class='module'>
      <div class='module-title'>*博客开发日志</div>
      <p>2020-07-06：由于markdown-it-vue的体积过于庞大，所以采用了Mavon-Editor作为Markdown解析器，减少了包的体积，优化了加载速度</p>
      <p>2020-07-06：采用了require.context的方式，获取文件夹下的全部文件和组件，完成自动注册全局组件</p>
      <p>2020-07-06：引入了icon-font的相关图标</p>
      <p>2020-07-06：添加vconsole,方便调试</p>
      <p>2020-06-01：陆续添加自己的文章</p>
      <p>2020-06-01：使用vue搭建了博客的基本框架，采用了tab切换模块，文章采用markdown方式</p>
      <p>2020-05-08：创建博客项目</p>
      <p></p>
    </div>
    <div class='module'>
      <div class='module-title'>*接下来的目标</div>
      <p>采用React和AntdMobile构建一个完全一致的版本</p>
      <p>添加服务端支持</p>
      <p>数据统计/文章评论/点赞等功能</p>
      <p>添加3D可视化的统计图表</p>
      <p>添加每一个模块的文章至5篇以上</p>
      <p>添加风格切换支持</p>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style scoped>
  .about-page{
    padding: 1rem 0.5rem 1rem 0.5rem;
  }

  .page-title{
    font-size: 0.5rem;
  }

  .module{
    margin: 0.4rem 0;

    font-size: 0.3rem;
    line-height: 0.5rem;
  }

  .module-title{
    font-size: 0.4rem;
    margin: 0.1rem 0;
    font-weight: bold;
  }
</style>