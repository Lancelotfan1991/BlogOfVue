# JS基础-继承2-继承的六种继承方式：

>本文章部分案例来自于 https://blog.csdn.net/yigongzi/article/details/88954076 


- [1，原型链继承：](#1原型链继承)  
- [2，借用构造函数](#2借用构造函数)  
- [3，组合继承](#3组合继承)  
- [4，原型式继承](#4原型式继承)  
- [5，寄生式继承](#5寄生式继承)


## 1，原型链继承：

直接指定prototype。

```javascript
function SuperType(){
	this.name=['jack','chan'];
}
function ChildType(){
    this.age=13;
}
ChildType.prototype=new SuperType();

let jack=new ChildType('12');
//console.log(jack instanceof SuperType);//判断jack是不是SuperType的实例，true
//console.log(jack instanceof ChildType);//判断jack是不是ChildType的实例，true
console.log(jack.name);

jack.name.push('ma');	//现在jack想要改个名字,在自己的名字后面加上ma。
console.log(jack.name);	

let lilei=new ChildType('13');
console.log(lilei.name);	//结果发现lilei的名字也改了。
```

优点：简单，而且可以直接调用b里面的方法。

缺点：prototype上的属性（引用类型的数据），会被多个实例共享。



## 2，借用构造函数

在子类的构造函数中调用父类的构造函数。从而将父类构造函数中定义的属性继承过来。这样我们就拥有了属于每个实例自己的属性备份。

```javascript
function SuperType(){
	this.name='123';
    
    function sayName(){
        alert(this.name);
    }
}

function ChildType(name,age){
	SuperType.call(this,name);	//调用父类的构造函数，为自己添加name属性。
    this.age=age;
}

let jack=new ChildType('jack');
console.log(jack instanceof SuperType);//判断jack是不是SuperType，为false
jack.sayName('jack');//会报错，提示sayName并不是一个function
```

优点：解决了prototype属性被多个实例共享的问题。

缺点：无法调用父类的方法。instanceof和isPrototypeof为false。



## 3，组合继承

是原型链继承和借用构造函数继承的结合。

```javascript
function SuperType(){
	this.name='123';
}

SuperType.prototype.sayName=function(){
    return this.name;
}

function ChildType(name,age){
	SuperType.call(this,name);	//调用父类的构造函数，为自己添加name属性。
    this.age=age;
}
ChildType.prototype=new SuperType();

let jack=new ChildType('jack');
console.log(jack instanceof SuperType);//判断jack是不是SuperType，为false
jack.sayName('jack');//123
```

优点：解决了前面两种继承方式的问题。

缺点：SuperType构造函数被调用了两次。

第一次是在指定原型时，new SuperType()，

第二次是在创建实例时，SuperType.call(this,name)

两次调用会分别存放一份SuperType的属性，一份存在实例中，一份存在prototype中。



## 4，原型式继承

借助原型基于已有的对象创建一个新的对象，这样我们可以不必创建自定义类型。

```javascript
function createOject(prototype){
	let F=function(){};
    F.prototype=prototype;
    return new F();
}
let person={
    name:"Nick",
    friends:['alex','bill','cathy']
}
let personA=createObject(person);
personA.name = 'jack';
personA.friends.push[('Tom')];

let personB=createObject(person);
personB.name = 'chen';
personB.friends.push('Jackie');

cosole.log(person.friends)
```

 原型式继承要求你必须有一个对象作为另一个对象的基础，在这个例子中，我们把person对象作为基础 。

 ES5通过新增的`Object.create()`方法规范化了原型式继承。这个方法接受两个参数：**一个用于作为新对象原型的对象和（可选的）为新对象定义额外属性的对象**。在传入一个参数的情况下，Object.create()和上面的object()方法相同。 

 `Object.create()`方法的第二个参数和使用`Object.defineProperties()`方法的第二个参数相同：**每个属性都是通过属性描述符添加的**。 

```javascript
let person = {
  name: 'Nick',
  friends: ['cherry', 'july'],
};

let person1 = Object.create(person);
person1.name = 'Jhon';
person1.friends.push('cherry');

let person2 = Object.create(person);
person2.name = 'Lily';
person2.friends.push('Bob');

console.log(person.friends); // ["cherry", "july", "cherry", "Bob"]
```

缺点：多个实例之间属性共享。





## 5，寄生式继承

> 寄生式继承是与原型式继承紧密相连的一种思想，它的基本思路是：**创建一个仅用于封装继承过程的函数，在函数内部已某种方式来增强对象，最后在真的像它做了所有工作一样返回对象**。 

```javascript
function object(){
	function F(){}
	F.prototype=o;
	return new F();
}

function createObject(original){
	let clone=object(original);
    clone.sayHi=function(){
        alert('hi');
    }
    return clone;
}

let person={
    nane:"Nick",
    friends:['nick','kacl'.'mary']
}
let person1=createObject(person);
person1.sayHi();
```

缺点：在函数中包装的方法，无法被复用。每次新建一个实例就要创建一次。



6，寄生组合式继承（最理想的继承方式）

寄生组合继承的基本模式：

```javascript
function object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}
function inheritPrototype(childType, superType) {
  let prototype = object(superType.prototype);   // 创建超类型原型的一个副本
  prototype.constructor = childType;            // 为创建的副本添加constructor属性，弥补重写原型后constructor属性的丢失
  childType.prototype = prototype;             // 新创建的原型副本赋值给子类型的原型
}
```

可以用寄生组合继承来解决上面组合继承的问题：

```javascript
function SuperType(name){
	this.name=name;
	this.colors=['red','yellow','blue'];
}

SuperType.prototype.sayName=function(){
	alert(this.name);
}

function ChildType(name,age){
	SuperType.call(this,name);
	this.age=age;
}

inheritPrototype(ChildType,SuperType);

let student1=new ChildType('karl',18);
let student2=new ChildType('lilith',20);
student1.sayName();//karl
student2.sayName();//lilith

student1 instanceof SuperType;
SuperType.prtototype.isPrototypeof(student2);
```

优点：

1，SuperType的构造函数只调用了一次，避免了在	childType	上创建不必要的属性。

2，可以使用	instanceof 	以及	isPrototypeOf 	来判断student的继承关系。