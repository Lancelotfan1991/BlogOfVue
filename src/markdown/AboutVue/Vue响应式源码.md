## Vue响应式的实现

### 1，创建Vue的构造器

```javascript
class FanVue {
  constructor(options) {
    //保存数据
    this.$options = options;
    this.$data = this.$options.data;
    this.$el = this.$options.el;
    //将data添加到响应式系统
    new Observer(this.$data);
    //代理this.$data中的数据
    Object.keys(this.$data).forEach(key => {
      this._proxy(key);
    });
    //处理el下面的所有节点
    new Compiler(this.$el, this);
  }
  //设置代理。这样可以直接使用this.message===xxx
  //来代替this.$data.message
  _proxy(key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      set(newValue) {
        this.$data[key] = newValue;
      },
      get() {
        return this.$data[key];
      }
    })
  }
}
```



### 2，创建观察者

```javascript
//添加观察者
//观察者的主要功能是重新定义每个data的get和set方法
//使data里数据的获取和修改能被监听
class Observer {
  constructor(data) {
    this.data = data;
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(data, key, value) {//定义响应式
    //每添加一个响应式的对象，则为其创建一个Dep对象
    let dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,//该属性的描述符才能够改变
      configurable: false,//该属性会出现在枚举属性中
      get() {
        //当通过compiler初次编译dom节点时，可以获取到所有的依赖
        //将这些依赖跟对应的属性绑定起来
        //添加到一个Dep的subscribers数组里面。
        console.log(Dep.target);
        //每一个Dep的target指向的一个watcher对象。
        if (Dep.target) { //只有初次Watcher添加依赖的时候，才会添加订阅者，之后不会再添加，为null
          dep.addSub(Dep.target)
        }
        return value;
      },
      set(newVal) {
        if (newVal === value) {
          return;
        }
        value = newVal;
        dep.notify();
      }
    })
  }
}
```



### 3，创建监听者

```javascript
class Watcher {
  constructor(node, name, vm) {
    this.node = node;
    this.name = name;
    this.vm = vm;
    Dep.target = this;
    this.update();
    Dep.target = null;
  }
  update() {//通知变化
    this.node.nodeValue = this.vm[this.name]
  }
}
```



### 4，创建订阅者

```javascript
class Dep {
  constructor() {
    this.subscribers = [];
  }
  addSub(sub) {
    this.subscribers.push(sub);
  }
  notify() {
    this.subscribers.forEach(sub => {
      sub.update();
    })
  }
}
```



### 5，编译模板，并建立依赖关系

```javascript
//将原本的页面进行重新编译
const regExp = /\{\{(.*)\}\}/ //识别双大括号的正则表达式
class Compiler {
  constructor(el, vm) {
    this.el = document.querySelector(el);
    console.log(this.el);
    this.vm = vm;
    this.frag = this.createFragment();
    this.el.appendChild(this.frag);
  }
  createFragment() { //依次取出模板的第一个子元素，并添加到fragement里
    const frag = document.createDocumentFragment();
    let child;
    while (child = this.el.firstChild) {
      this.compile(child);
      frag.appendChild(child);
    }
    return frag;
  }
  compile(node) {
    console.log(node.nodeType);
    if (node.nodeType == 1) {
      const attrs = node.attributes;
      if (attrs.hasOwnProperty('v-model')) {
        const name = attrs['v-model'].nodeValue;
        node.addEventListener('input', e => {
          this.vm[name] = e.target.value;
        })
      }
      for (let i = 0; i < node.childNodes.length; i++) {
        this._compile(node.childNodes[i]);
      }
    }
    if (node.nodeType === 3) {
      if (regExp.test(node.nodeValue)) {
        const name = RegExp.$1.trim();
        new Watcher(node, name, this.vm);
      }
    }
  }
}
```



