# JS基础-原型链

在 ECMAScript 核心所定义的全部属性中，最耐人寻味的就要数 `prototype` 属性了。对于 ECMAScript 中的引用类型而言，`prototype` 是保存着它们所有实例方法的真正所在。换句话所说，诸如 `toString()`和 `valuseOf()` 等方法实际上都保存在 `prototype` 名下，只不过是通过各自对象的实例访问罢了。

通过protoType，使得我们创建的对象可以访问原型链上定义的其他属性和方法。比如以下代码：

```javascript
var a=new Array(3);
console.log(a);
console.log(a.__proto__)
a.toString();
a.hasOwnProperty();
a.calculate();
Object.prototype.calculate=function(){console.log('123')};
Array.prototype.includes=function(i){return false};
a.calculate();
a.includes(1);
```

在上面这个例子中，定义了一个新的数组对象。

1)首先尝试打印这个对象，发现这个对象仅仅包含一个length属性以及一个隐藏的proto属性。

通过这个proto对象，我们可以允许a调用不存在于自身的方法。

2)当我们调用a.toString()方法时，会先判断自身是否有这个方法，如果没有，则沿着原型链一层层往上找。

在这个案例中，首先会找到Array.prototype，Array的prototype中定义了数组的多个方法，如pop，reduce，filter等等，从而允许我们对数组进行操作。

3)当我们调用hasOwnProperty方法时，会先找到Array.prototype，发现并没有这个方法后，会继续沿着Array.prototype.proto继续寻找，找到Object.prototype里定义的方法。结果输出为false。

4)当我们继续调用calculate方法，这个时候会抛出错误，因为并没有从原型链上找到这个方法。

5)我们可以给Object的prototype对象添加一个新的方法，名为calculate。

6)当我们再次尝试调用a.calculate()，这时将不再报错，因为原型链上已经定义了该方法。





### prototype的经典使用：

1，在vue中，由于数组元素的特殊性，vue没有选择监听数组元素下标的变化。而是采取了劫持数组的七个方法的形式。

劫持的七个方法分别使：push，pop，shift，unshift，splice，sort，reverse。

这七个方法的共同点都是都是对原数组进行了修改。

具体的实现是，当我们检测到某个数组需要进行响应式的处理，那么我们会将这个数组的proto指向一个被劫持后的新的对象上去，这个对象里包含了数组的全部方法，只不过对其中的七个方法进行了特殊的处理。当我们对这个数组使用这七个方法时，会使用这新的七个方法。这七个方法里，通过object.defineProperty修改了value属性。

当调用时，会通知数组的依赖notify。



2，同样是在Vue中，所有创建的Vue实例都是继承自root的Vue对象，所以他们能够通过原型链访问到来自root对象的属性。

比如Vue-Router创建后，引入的$router和$route对象，他们本质上都是来自于root 的Vue节点上。

