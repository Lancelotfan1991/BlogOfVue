# JS基础-继承

1，几个核心概念

构造函数

原型属性

实例对象



一个重要的概念：

> **每一个对象自身都拥有一个隐式的`[[proto]]`属性，该属性默认是一个指向其构造函数原型属性的指针**。 

另一个重要概念：

> **几乎所有函数都拥有`prototype`原型属性** 

在JavaScript世界，实现继承的方式有以下两种：

>1. **创建一个对象并指定其继承对象（原型对象）**；
>2. **修改构造函数的原型属性（对象）**；



继承的本质:

> **我们设置一个对象的继承关系，本质上是在操作对象隐式的`[[proto]]`属性** 
>
>**而JavaScript只为我们开通了在对象创建时定义`[[proto]]`属性的权限，而拒绝让我们在对象定义时再修改或访问这一属性（所以它是“隐式”的）。很遗憾，在对象定义后改变它的继承关系确实是不可能的。 **

## 关于Object.create()和对象继承

```javascript
//我们现在希望创建一个y对象，并且想让y继承x；
var x = { 
    name: 'tom',
    sayName: function() {
        console.log(this.name)
    }
}
//Object.create接收两个参数，一个是创建对象（在本题中是y）想要继承的对象（x），一个是属性描述对象
var y = Object.create(x, {
    name: {
        configurable: true,
        enumerable: true,
        value: 'kitty',
        writable: true,
    }
})
//y成功继承了x，并且可以使用x的方法。
y.sayName() // 'kitty'
```

这个写法等同于：

```javascript
var y={};
y.[[proto]]=x;//这个环节只是为了说明发生了什么，实际上并不可以直接这样显式的赋值，而且y的[[proto]]不可以在创建后修改。
Object.defineProperty(y,'name',{configurable...});
```



