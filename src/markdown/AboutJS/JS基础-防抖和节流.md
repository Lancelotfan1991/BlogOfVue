# 防抖和节流

## 1，防抖函数

> **所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。如此一来，如果用户输入特别频繁，频繁触发事件，则定时器会被不断地刷新，只有等用户停止输入时才会发送请求。** 

```javascript
//延时执行防抖
function debounce(fn,delay){
	var timer=null;//使用闭包来保存变量。
	return function(){
        let context = this;
        let args=arguments;//保证debounce函数最终返回的函数this指向不变，而且能接收到参数。
        if(timer) cleartTimeout(timer);
        
        timer = setTimeout(()=>{
            fn.apply(this,args);
        },delay)
	}
}
```

另一种需求是，触发事件后立即执行一次函数，之后等不触发事件n秒后再继续执行一次函数

```javascript
//立即执行防抖函数
function debounce(fn,delay,immediate){
    var timer=null;//使用闭包保存变量
    return function(){
        let context= this;
        let args=arguments;
        
     	if(timer) {
            clearTimeout(timer);
        }
        if(immediate){//如果是立即执行
            let callNow = !timer;//如果timer为null
            timer =setTimeout(()=>{//一段时间后清除定时器
                timer = null;
            },delay)
            if(callNow) fn.apply(context,args)//执行函数
        }else{
            timeout = setTimeout(function(){
            	fn.apply(context,args);  	  
            },delay)
        }
    }
}
```



## 2，节流函数

> ***所谓节流，就是指连续触发事件但是在n秒中只执行一次。节流会稀释函数的执行频率。***
>
> 换言之，与防抖最大的表现区别就是：
>
> **用户现在持续不断地输入或者执行某个操作，每隔1秒，才会执行一次指定的函数。**
>
> 而使用防抖的时候，具体的表现则是：
>
> **用户在触发事件的时候，不会立即执行函数，只有当用户停止造作的时候，才会执行。（例外：也可以做一个立即执行）**

```javascript
//定时器版本
function throttle(fn,delay){
	let timeout;
    return function(){
        let context = this;
        let args=arguments;
        if(!timeout){
            timeout= setTimeout(()=>{
                fn.apply(context,args);
            },delay)
        }
    }
}

//时间戳版本
function throttle(fn,delay){
    let pervious;
    return function(){
        let context=this;
        let args=arguments;
        let now = Date.now();
        if(now-previous >delay){//比较时间戳，是否超过给定间隔
            func.apply(context,args);//执行方法
            previous=now;//重置执行时间
        }
    }
}
```

