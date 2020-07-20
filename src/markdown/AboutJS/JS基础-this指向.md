# JS基础-This指向

### this的作用

方便代码的复用。



### 函数的this绑定规则：

1，默认绑定

```javascript
//独立函数调用,this的指向为window。
```



2，隐式绑定

```javascript
//通过某个对象进行调用，this指向的是该对象。
```



3，显式绑定

```javascript
//隐式绑定的前提：
//必须在调用的对象内部有一个对函数的引用,否则会报错，提示找不到该函数
//为了避免这种报错（不希望在对象内部包含这个函数的引用，同时有希望在这个对象上强制该方法调用）
//比如我们现在有一个公共的对象，定义了两个函数，分别
var obj={
    sayName:function(){console.log(this.name)},//这个方法可以打印name。
    sayAge:function(){console.log(this.age)}//这个方法可以打印age。
}

var person={
    name:"fantasy",
    age:"45"
}
//这个时候，如果我们希望打印person的名称和年龄。我们不希望再将obj中的两个方法重写一遍。
//此时，我们可以这样写：
obj.sayName.apply(person);	//打印：fantasy
obj.sayAge.apply(person);	//打印：45

//或者：
let fn1=obj.sayName.bind(person);	
let fn2=obj.sayAge.bind(person);	//将sayName和sayAge预先绑定到person上。
fn1();
fn2();				//当调用时，真正的this其实是person。所以最终的结果是fantasy和45

//可以使用call和apply方法，明确地绑定this指向的对象
//或者使用bind方法，当函数被调用时，会自动调用apply方法，进行显式绑定

//通过bind/call和apply，我们可以很大程度的减少重复代码，并且更灵活的调用函数。
```



4，new 绑定。

```javascript
//JavaScript中的函数可以当做一个类的构造函数来使用，也就是使用new关键字。

//使用new关键字来调用函数时，会执行如下的操作：

//1.创建一个全新的对象；
//2.这个新对象会被执行Prototype连接；
//3.这个新对象会绑定到函数调用的this上（this的绑定在这个步骤完成）；
//4.如果函数没有返回其他对象，表达式会返回这个新对象；


function Person(name){
    console.log(this);	//这个this指向构造函数Person{}
    this.name=name;		// Person{name:"fantasy"}
}

var p=new Person('fantasy');
console.log(p);

//等同于
var p=function(){
    const obj={};
    obj.proto=Person.prototype;
    let result=Person.call(obj);
    return result;
}
console.log(p());
```



一些其他情况：

1，页面元素的点击事件：

```javascript
//页面元素的点击，一般情况下this指向的是触发事件的元素
```



2，ES6箭头函数：根据当前函数执行上下文

```javascript
//根据函数执行的上下文依次向上查找。直到找到this。
//如果箭头函数外，仍然是箭头函数，则继续向上查找。
```



3，Settimeout以及SetInterval：一般this指向window。