# ES6_Promise对象

文章部分内容引用自

[阮一峰的ES6博客]: https://es6.ruanyifeng.com/#docs/promise#Promise-prototype-then



## 1，Promise的含义

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。 

Promise的特点

 （1）对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Promise`这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。 

 （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。 

Promise解决的核心问题：

1，解决了回调地狱的问题，代码可读性增强

2， Promise有这些特征：只能决议一次，决议值只能有一个，决议之后无法改变。任何then中的回调也只会被调用一次。Promise的特征保证了Promise可以解决信任问题。 

## 2，基本用法：

创建一个Promise对象：

```javascript
const promise=new Promise(resolve,reject){
    if(status==1){
        resolve(res);//调用resolve函数，promise对象的状态将从pending变为fulfilled(由进行中变成已成功)，并且将操作的结果作为参数传递
    }else{
        reject(err);//调用reject函数，promise对象的状态将从pending变为rejected，同时失败的信息会作为参数传递出去
    }
}
```

## 3，Promise.Then

我们可以用Promise.prototype.then来获取一个promise对象的结果:

 `then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受`Promise`对象传出的值作为参数。 

```javascript
promise.then(
    res=>{console.log(res)},//获取到成功状态下返回的结果，并做一定的处理
    err=>{console.log(err)}//获取到失败状态下的结果，并做一定的处理
)
```



3， `then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。 

```javascript
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
```



## 4，一个实际的案例：

将一个普通的xmlHttpRequest对象，用promise实现一个AJAX：

```javascript
const request=function(options){
	return new Promise((resolve,reject)=>{
		
        const handler=()=>{
            if(this.readyState !== 4){//如果状态码不为4，则不执行
                return;
            }
            if(this.status==200){
                resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        } 
        const xhr=new XMLHttpRequest();
        if(options.method=='get') xhr.open('GET',options.url);//确定xhr的请求格式,如果是get请求则url后面要跟上参数
        else if(options.method=='post')	xhr.opne('POST',options.url);
        xhr.onreadystatechange=handler;//处理状态变化的逻辑
        xhr.responseType='json';//请求格式
        xhr.setRequestHeader("Accept","application/json");
        //发送
        xhr.send(options.data);
	});
}
request(options).then(res=>{
    console.log(res);
    let data=JSON.parse(res);
},err=>{
    console.log(err);
});
```

## 5，Promise.all

```javascript
p=new Promise.all([p1,p2,p3])
    .then(res=>console.log(res))
    .catch(err=>alert(err));
```

 `Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。 

（1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

可以运用在以下场景：

在同时获取到信息的a,b,c三部分后，才能进行下一步时，否则报错，可以采用这个方案：

```javascript
let a=request('urla');
let b=request('urlb');
let c=request('urlc');
Promise.all([a,b,c]).then(res=>{
    console.log("abc均已加载完毕");
}).catch(err=>{
    console.log('a,b,c中缺少一个，缺少关键参数，无法进行下一步');
})
```

## 6，Promise.race

```javascript
p=Promise.race([p1,p2,p3])
    .then(res=>console.log(res))
    .catch(err=>alert(err));
```

 `Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。 

 上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。 

可以运用在以下场景：

1，给多个Promise实例设置超时的时间：

```javascript
let a=request('urla');
let b=request('urlb');
let c=request('urlc');
let timeout=new Promise.reject(setTimeout(function(){throw '请求超时'},3000));
Promise.race([a,b,c,timeout]).then(res=>{
    console.log("abc其中一个fulfilled");
}).catch(err=>{
    console.log('a,b,c任何一个reject，或者请求超时');
})
```

2，多个数据来源，只需要拿到其中一个结果即可进行接下来的流程。

## 7，Promise.finally:

finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});

//finally方法本质上是下面这个写法的特例：
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

8，Promise.catch

catch方法本质上是then的一个特别写法：

> `Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。 

## 此外还有知识等待补充：

9,Promise.resolve()：

返回一个Promise，其状态为fulfilled状态。

10,Promise.reject()

返回一个Promise，其状态为reject状态。



此外还有

Promise.allSettled

Promise.any

Promise.try等新特性。

在这篇文章中暂不考虑。