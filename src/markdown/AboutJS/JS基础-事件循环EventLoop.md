## JS基础-事件循环EventLoop

来自转载：

### 宏队列和微队列

> 宏队列，macrotask，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括：
>
> setTimeout
> setInterval
> setImmediate (Node独有)
> requestAnimationFrame (浏览器独有)
> I/O
> UI rendering (浏览器独有)

### 微队列

>microtask，也叫jobs。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：
>
>process.nextTick (Node独有)
>Promise
>Object.observe
>MutationObserver
>（注：这里只针对浏览器和NodeJS)

### 浏览器处理事件循环的顺序

1，执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout等）；
全局Script代码执行完毕后，调用栈Stack会清空；
2，从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；
3，继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；
4，microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
取出宏队列macrotask queue中位于队首的任务，放入Stack中执行；
5，执行完毕后，调用栈Stack为空；
6，重复第3-7个步骤；
7，重复第3-7个步骤；
......

```javascript
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);

//最终打印的结果是:
// 1 4 7 5 2 3 6
```



作者：liuxuan
链接：https://segmentfault.com/a/1190000016278115
来源：SegmentFault 思否
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。