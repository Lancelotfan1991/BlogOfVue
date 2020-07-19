# JS基础-闭包

每当 JavaScript 执行一个函数时，都会创建一个作用域对象（scope object），用来保存在这个函数中创建的局部变量。它使用一切被传入函数的变量进行初始化（初始化后，它包含一切被传入函数的变量）。这与那些保存的所有全局变量和函数的全局对象（global object）相类似，但仍有一些很重要的区别：第一，每次函数被执行的时候，就会创建一个新的，特定的作用域对象；第二，与全局对象（如浏览器的 `window` 对象）不同的是，你不能从 JavaScript 代码中直接访问作用域对象，也没有 可以遍历当前作用域对象中的属性 的方法。 

作用域对象组成了一个名为作用域链（scope chain）的（调用）链。它和 JavaScript 的对象系统使用的原型（prototype）链相类似。

一个**闭包**，就是 一个函数 与其 被创建时所带有的作用域对象 的组合。闭包允许你保存状态——所以，它们可以用来代替对象。

案例1：添加计时器

```javascript
function addCount() {
  var conut = 0;
  return function() {
    count = count + 1;
    console.log(count);
  };
}

var fun1 = addCount();
fun1(); //1
fun1(); //2
var fun2 = addCount();
fun2(); //1
fun2(); //2

```

案例2：给一系列元素添加点击事件

```javascript
var op = document.querySelectorAll("p");
for (var j = 0; j < op.length; j++) {
  op[j].onclick = function() {
    alert(j);
  };
}
//alert出来的值是一样的
// 解决办法一:
for (var j = 0; j < op.length; j++) {
  (function(j) {
    op[j].onclick = function() {
      alert(j);
    };
  })(j);
}
// 解决办法二:
for (var j = 0; j < op.length; j++) {
  op[j].onclick = (function(j) {
    return function() {
      alert(j);
    };
  })(j);
}
//解决方案三
for (let j = 0; j < op.length; j++) {
  op[j].onclick = function(){
      alert(j);
  };
}
```

案例3：一个复杂的闭包实践

```javascript
function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);//undefined,?,?,?
var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?
//问:三行a,b,c的输出分别是什么？
//从第一行开始分析：
func(0)=>undefined,此时o=undefined，n=0,a.fun(1)=0,a.fun(2)=0,fun(3)=0
//第二行
undefined,0,1,2
//第三行
undefined,0,1,1
```

### 闭包的运用

bind方法，该方法接受一个函数和一个语境(上下文对象)，并返回一个在给定环境中调用给定函数的函数。并将所有的参数原封不动的传递过去。

```javascript
var handler={
    message:"提示 Event Handled",
    handleClick : function(event){
        alert(this.message +":"+event.type);
    }
}

function bind(fn,context){
    return function(){
        return fn.apply(context,arguments);
    }
}

var button=document.getElementById("my-btn");
//在不绑定的情况下，最终的结果会是undefined，因为没有保存handler.handleClick的环境，所以this的对象最终指向了window
EventUtil.addHandler(btn,"click",handler.handleClick);
//采用bind的方式，创建了一个保存执行环境的函数。
EventUtil.addHandler(btn,"click",bind(hanlder.handleClick,handler));
//在ES5中，所有的函数都有自己的bind方法，可以直接bind到指定的环境
EventUtil.addHandler(btn,"click",hanlder.handleClick.bind(handler));
```

### 闭包的运用之2

[防抖和节流函数。](./JS基础-防抖和节流.md);



### 闭包的缺陷：

会导致内存占用过高，因为变量没有得到释放。

### 闭包的优点：

保护私有变量： 重用变量又不造成全局污染 

每个模块都可以调用，当程序越来越复杂之后，会带不可预测的危险

所以推荐变量尽量私有化，当我们需要让局部变量发挥全局变量的作用时，可以考虑使用闭包

