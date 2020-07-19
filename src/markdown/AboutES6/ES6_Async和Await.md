# Async和Await

MDN解释:

> `**async function** 用来定义一个返回 [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 对象的异步函数。异步函数是指通过事件循环异步执行的函数，它会通过一个隐式的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 返回其结果。如果你在代码中使用了异步函数，就会发现它的语法和结构会更像是标准的同步函数。 



原文链接：http://caibaojian.com/asyncawait.html

### 什么是Async/Await?

- async/await是写[异步](http://caibaojian.com/t/异步)代码的新方式，以前的方法有**回调函数**和**Promise**。
- async/await是基于Promise实现的，它不能用于普通的回调函数。
- async/await与Promise一样，是非阻塞的。
- async/await使得异步代码看起来像同步代码，这正是它的魔力所在。



### 一个简单的Promise和Async/await对比

```javascript
//使用promise的一个案例:
const MakeRequest= ()=>{
	getJson().then(data=>{
		console.log(data);
		return 'done';
	});
}
MakeRequest();

//我们可以使用async/await重写这段代码:
const MakeRequest=async ()=> {
    cosole.log(await getJson());
    return 'done';
}
MakeRequest();
```



原文链接：http://caibaojian.com/asyncawait.html

### 与Promise的更多对比

##### 1,更加简洁

##### 2,Async/await让try/catch可以同时处理同步和异步的错误

```javascript
const makeRequest(){
    try{
       getJson().then(data=>{
           let res=JSON.parse(data);//在pomise状态下,当我们不额外增加一个catch的话,如果json.parse出错,将无法处理错误,因为错误在promise中
           console.log(res);
       })
       //.catch(err=>{
       //	console.log(err);    
       //})
    }.catch(err=>{
        console.log(err);
    })
}
//使用async/await重写以上代码,catch能处理Json.parse错误
const makeRequest =asycn ()=>{
    try{
        let res=JSON.parse(await getJson());
        cosnole.log(res);
    }.catch(err){
        console.log(err);
    }
}
```

##### 3,条件语句

```javascript
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {		//是否需要发送第二个请求
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}

//这些代码看着就头痛。嵌套（6层），括号，return语句很容易让人感到迷茫，而它们只是需要将最终结果传递到最外层的Promise。

//可以使用async大大提高阅读性

const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}
```

##### 4,中间值



```javascript
//你很可能遇到过这样的场景，调用promise1，使用promise1返回的结果去调用promise2，然后使用两者的结果去调用promise3。你的代码很可能是这样的: 
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      return promise2(value1)			//第二个promise需要使用第一个promise的返回值
        .then(value2 => {        
          return promise3(value1, value2)	//第三个promise需要使用前两个promise的值
        })
    })
}

//可以使用promise.all优化以上代码,减少嵌套次数
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      return Promise.all([value1, promise2(value1)])
    })
    .then(([value1, value2]) => {      
      return promise3(value1, value2)
    })
}

//使用async/await来写:
const makeRequest = async ()=>{
    let value1=await promise1();
    let value2=await promise2(value1);
    return promise3(value1,value2);
}
```

5,调试





### Async在事件循环中的案例

代码中用数字代表了代码执行的顺序:

```javascript
async function async1(){
    console.log('async1 start',222222);			//执行async同步代码		--------2
    await async2();
    console.log('async end',666666);			//执行微任务第一个	-------6
}

async function async2(){
    console.log('async2 start',333333333);		//执行async中同步代码 	---------3
}

console.log('script start',111111111111);		//执行同步代码	---------1

setTimeout(function(){
    console.log('set time out',88888888)		//执行宏任务		------ 8
},0);

async1();										

new Promise((resolve,reject)=>{
    console.log('promise pending',4444444)			//执行微任务中的同步代码-----4
    resolve();
}).then(()=>
    console.log('promise fulfilled',7777777)		//执行第二个微任务	---- 7	
);

console.log('script end',5555555)					//同步代码代码执行结束  -----5


```



