### VueRouter的原理和理解



#### 1，Vue-Router本质上解决的问题：

*改变浏览器中的地址，而不导致页面刷新（单页面富应用）。

*注册全局的$router和route对象，从而使得我们在组建内部可以调用。

*通过导航守卫，使得我们可以在各个环节增加属于开发者自己的逻辑。

*当路径中的地址发生变化时，页面获取到地址的变化，并作出响应。

*router-view对象根据route的变化以及 keep-alive属性进行渲染。



#### 2，Vue-Router核心实现

##### 问题1，如何实现改变浏览器的地址而不导致页面刷新？



解释：通过三种方式：

1）通过Hash；HashHistory。

2）通过Html5 History的pushState和replaceState api；HTML5History。

3）通过stack模拟浏览器记录。AbstractHistory。（用于SSR）



##### 问题2：$router和$route两个对象从何而来？

源码地址：vue-router/index

解析：当install时，Vue-Router给Vue的原型上挂载了$router和_route。并注册了Router-view和Router-link。

```javascript
//定义在Vue原型上的$router和$route
Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
})

Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
})

Vue.component('RouterView', View)
Vue.component('RouterLink', Link)
```

而在vue中，所有的子组件都是Vue的实例，并且可以访问到Vue全局prototype上注册的对象。因而，我们可以在任何位置访问到$router和$route。

##### 问题3：导航守卫是怎样被添加的？



##### 问题4：如何判断路径的变化？

解析：

路径的变化，之所以能够被响应，是因为

1，VueRouter在创建History对象时，分别添加了两个EventListeners。

两个Listener分别如下：

hash模式下，会监听hashchange事件，之所以此处还监听了popstate。

```javascript
window.addEventListener(
    supportsPushState ? 'popstate' : 'hashchange',
    () => {
        const current = this.current
        if (!ensureSlash()) {
            return
        }
        this.transitionTo(getHash(), route => {
            if (supportsScroll) {
                handleScroll(this.router, route, current, true)
            }
            if (!supportsPushState) {
                replaceHash(route.fullPath)
            }
        })
    }
)
```

history模式下则会监听popstate事件。

```javascript
window.addEventListener('popstate', e => {
    const current = this.current
    // Avoiding first `popstate` event dispatched in some browsers but first
    // history route not updated since async guard at the same time.
    const location = getLocation(this.base)
    if (this.current === START && location === initLocation) {
        return
    }
    this.transitionTo(location, route => {
        if (supportsScroll) {
            handleScroll(router, route, current, true)
        }
    })
})
```

2，当事件被监听后，会调用transitionTo方法，从而使得route对象发生改变。

而route的改变早已在beforeCreate的时候，完成了双向绑定。

因此，当route对象发生改变时，router-view组件会重新渲染。调用自身的h函数。

```javascript
Vue.mixin({
    beforeCreate () {
        if (isDef(this.$options.router)) {
            this._routerRoot = this
            this._router = this.$options.router
            this._router.init(this)
            Vue.util.defineReactive(this, '_route', this._router.history.current)
        } else {
            this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
        }
        registerInstance(this, this)
    },
    destroyed () {
        registerInstance(this)
    }
})
```



##### 问题5：Router-view是如何根据route的变化而渲染的

解析：

如果route指向的节点是keep-alive的，则渲染缓存的节点Component；

值得注意的地方是：虽然我们经常使用keep-alive来包裹Router-view，但是这个组件是Vue内置的组件。

```javascript
// render previous view if the tree is inactive and kept-alive
//如果上一个节点为inactive的节点
if (inactive) {
    //从保存的cache种寻找相同的组件名
    const cachedData = cache[name]
    //寻找同名的组件
    const cachedComponent = cachedData && cachedData.component
    if (cachedComponent) {
        // #2301
        // pass props
        if (cachedData.configProps) {
            fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps)
        }
        //渲染缓存的节点
        return h(cachedComponent, data, children)
    } else {
        // render previous empty view
        return h()
    }
}
```

如果route指向的节点是非Keep-alive的，则直接重新渲染

```javascript
const configProps = matched.props && matched.props[name]
// save route and configProps in cachce
if (configProps) {
    extend(cache[name], {
        route,
        configProps
    })
    fillPropsinData(component, data, route, configProps)
}
return h(component, data, children)
```

#### 一些仍然需要花精力去研究和解决的问题：

1，matcher对象

2，路由导航守卫

3，a标签的渲染

4，何时触发的popstate