# 解构



### 解构的定义

 ——解构赋值允许你使用类似数组或对象字面量的语法将数组和对象的属性赋给各种变量。 



### 数组的解构

在ES6之前，如果我们想要获取一个数组元素的前三个元素的值，我们可能要这样做：

```javascript
const arr=[1,2,3,4,5]
let a=arr[0];
let b=arr[1];
let c=arr[2];
console.log(a,b,c);
//最终的结果：1，2，3
```

我们可以利用解构简化这个过程：

```javascript
let [a,b,c]=arr;
console.log(a,b,c);
//最终的结果：1，2，3
```

如果此时我们只想要第三个元素，可以直接用逗号“，”占位

```javascript
let [,,c]=arr;
console.log(c);
//最终的结果是：3
```

如果我们只想捕获第一个元素，剩下的元素用数组来捕获，我们可以这样写：

```javascript
let [a,...c]=arr;
console.log(a,c);
//最终的结果：
//a==>1,
//c==>[2,3,4,5];
```

如果我们想要对arr的尾部添加一个新的元素10，我们可以这样做：

```javascript
let a=[...arr,10];//在数组的结尾添加一个元素
let b=[10,...arr];//在数组的开头添加一个元素
console.log(a);
console.log(b);
//最终的结果：
//a==>[1,2,3,4,5,10];
//b==>[10,1,2,3,4,5];
```

### 对象的解构

对象的解构类似数组，直接上代码

```javascript
var {name: a} = {name:"fan",age:"19"}
console.log(a);
//最终的结果：
//a==>fan
```

可以简写成：

```javascript
var {name} = {name:"blue",age:"20"}
console.log(name);
//最终的结果：
//name==>blue
```

可以用嵌套的方式对一个复杂的对象进行组合解构：

```javascript
var [name,{id},{name:newname}]= ['wode',{"id":"123"},{name:"123"}]
console.log(name,id,newname);
//最终的结果：
//wode 123 456
```

### 解构的同时赋予默认值

```javascript
let arr=[1,2,3];
[,,,a=10]=arr;
[,,,b]=arr;
console.log(a,b);
//最终的结果时b为undefined，而a则是默认值10
```



#### 解构的一些用法：

[ES6深入浅出——解构]: https://www.infoq.cn/article/es6-in-depth-destructuring

>### 函数参数定义
>
>作为开发者，我们需要实现设计良好的 API，通常的做法是为函数为函数设计一个对象作为参数，然后将不同的实际参数作为对象属性，以避免让 API 使用者记住 多个参数的使用顺序。我们可以使用解构特性来避免这种问题，当我们想要引用它的其中一个属性时，大可不必反复使用这种单一参数对象。
>
>```javascript
>function getStudentInfo({name,id,age}){
>	console.log(name);
>	console.log(id);
>	console.log(age);
>}
>getStudentInfo({name:'fan'});
>//得到的结果
>//fan undefined undefined
>```



>### 配置对象参数
>
>延伸一下之前的示例，我们同样可以给需要解构的对象属性赋予默认值。当我们构造一个提供配置的对象，并且需要这个对象的属性携带默认值时，解构特性就派上用场了。举个例子，jQuery 的`ajax`函数使用一个配置对象作为它的第二参数，我们可以这样重写函数定义：
>
>```javascript
>jQuery.ajax = function (url, {
>   async = true,
>   beforeSend = noop,
>   cache = true,
>   complete = noop,
>   crossDomain = false,
>   global = true,
>   // ... 更多配置 
>	}) {
>// ... do stuff
>};
>```