# Vue-Router原理

前端路由实现的核心原理主要有两种：

一种是hash模式，一种是history模式。

## Hash模式

下面是一个基于hash实现的简单路由

```html
//在hash模式下，我们改变url的hash值，而window对象则会监听hashchange的方法，动态地给router-view来赋值。
<body>
  <a href='#/home'>首页</a>
  <a href='#/about'>关于</a>
  <a href='#/profile'>我的</a>
  
  <div id='router-view'>首页</div>
    
  <script>
      const aEls=document.getElementsByTagName('a');	//获取所有的a标签
      for(let ele of aEls){
          ele.addEventListener('click',(e)=>{
              e.preventDefault();	//阻止a按钮的默认点击事件
              console.log(ele);
              let href=ele.getAttribute('href');	//获取a标签上的href属性 
              window.location.hash=href;	//更改href的hash
          });
      }
      
      window.addEventListener('hashchange',(e)=>{	//监听hashchange事件
        
          let hash=window.location.hash;
          console.log(hash);
          let routerview=document.getElementById('router-view');	//根据hash值确定页面的显示内容
          switch(hash){
              case '#/home':
                  routerview.innerHTML='首页'
               break;
              case '#/about':
                  routerview.innerHTML='关于'
              break;
              case '#/profile':
                routerview.innerHTML='我的'
               break;
          }
      })
  </script>
</body>
```



## History模式

下面是一个基于history实现的简单路由:

```html
<body>
    <a href='/home'>首页</a>
    <a href='/about'>关于</a>
    <a href='/profile'>我的</a>
    
    <div id='router-view'>
        首页
    </div>
    
    <script>
    	const aEls=document.getElementsByTagName('a');
        for(var ele of aEls){
            ele.addEventListener('click',()=>{
               event.preventDefault();
               let href=ele.getAttribute('href')
               window.location.pushState({},'',href);
               changeURL();
            });
        }
        
        function changeURL(){
            let href=window.location.pathname;
            let routerview= document.getElementById('router-view');
            switch(href){
                case '/home':
                    routerview.innerHTML='首页'
                    break;
                case '/about':
                    routerview.innerHTML='关于'
                    break;
                case '/profile':
                    routerview.innerHTML='我的'
                    break;
            }
        }
        
        window.addEventListener('popstate',()=>{  //添加popstate事件，监听主动go，forward以及点击浏览器上方的前进后退等按钮
            changeURL();
          })
    </script>
</body>
```





我们拦截a链接，阻止其默认事件。

当我们点击某个a链接，会触发pushstate({)，



而window则会监听popstate