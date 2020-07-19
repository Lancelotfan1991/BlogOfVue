# Http与Ajax

Http即HyperText Transfer Protocol，超文本传输协议。它是为 Web 浏览器与 Web 服务器之间的通信而设计的 。

> **HTTP是一种能够获取如 HTML 这样的网络资源的** [protocol](https://developer.mozilla.org/en-US/docs/Glossary/protocol)(通讯协议)。**它是在 Web 上进行数据交换的基础，是一种 client-server 协议，也就是说，请求通常是由像浏览器这样的接受方发起的。一个完整的Web文档通常是由不同的子文档拼接而成的，像是文本、布局描述、图片、视频、脚本等等。** 



Http不应被归于JS基础，这里之所以和Ajax一起写，是因为我们一般使用ajax来实现Http。

> 基于HTTP的最常用API是[`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) API，可用于在[user agent](https://developer.mozilla.org/en-US/docs/Glossary/user_agent)和服务器之间交换数据。 现代[`Fetch API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)提供相同的功能，具有更强大和灵活的功能集。 

 **AJAX**即“**Asynchronous JavaScript and XML**” 。

换句话说：我们所使用的Ajax技术，是基于HTTP实现的一些API。



## Http的Headers：

>根据不同上下文，可将消息头分为：
>
>- [General headers](https://developer.mozilla.org/zh-CN/docs/Glossary/通用首部): 同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
>- [Request headers](https://developer.mozilla.org/zh-CN/docs/Glossary/请求头): 包含更多有关要获取的资源或客户端本身信息的消息头。
>- [Response headers](https://developer.mozilla.org/zh-CN/docs/Glossary/Response_header): 包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
>- [Entity headers](https://developer.mozilla.org/zh-CN/docs/Glossary/Entity_header): 包含有关实体主体的更多信息，比如主体长(Content-Length)度或其MIME类型。



## Http的响应代码：

> HTTP 响应状态代码指示特定 [HTTP](https://developer.mozilla.org/zh-cn/HTTP) 请求是否已成功完成。响应分为五类：信息响应(`100`–`199`)，成功响应(`200`–`299`)，重定向(`300`–`399`)，客户端错误(`400`–`499`)和服务器错误 (`500`–`599`)。状态代码由 [section 10 of RFC 2616](https://tools.ietf.org/html/rfc2616#section-10)定义 



## 一些常见的响应代码

>[`200 OK`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/200) 请求成功。成功的含义取决于HTTP方法
>
>[`203 Non-Authoritative Information`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/203)
>
>服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝。当前的信息可能是原始版本的子集或者超集。例如，包含资源的元数据可能导致原始服务器知道元信息的超集。使用此状态码不是必须的，而且只有在响应不使用此状态码便会返回200 OK的情况下才是合适的。
>
>[`301 Moved Permanently`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/301)
>
>被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。
>
>[`400 Bad Request`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/400)
>
>1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。
>
>2、请求参数有误。
>
>[`403 Forbidden`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/403)
>
>服务器已经理解请求，但是拒绝执行它。与 401 响应不同的是，身份验证并不能提供任何帮助，而且这个请求也不应该被重复提交。如果这不是一个 HEAD 请求，而且服务器希望能够讲清楚为何请求不能被执行，那么就应该在实体内描述拒绝的原因。当然服务器也可以返回一个 404 响应，假如它不希望让客户端获得任何信息。
>
>[`404 Not Found`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/404)
>
>请求失败，请求所希望得到的资源未被在服务器上发现。没有信息能够告诉用户这个状况到底是暂时的还是永久的。假如服务器知道情况的话，应当使用410状态码来告知旧资源因为某些内部的配置机制问题，已经永久的不可用，而且没有任何可以跳转的地址。404这个状态码被广泛应用于当服务器不想揭示到底为何请求被拒绝或者没有其他适合的响应可用的情况下。
>
>[`500 Internal Server Error`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/500)
>
>服务器遇到了不知道如何处理的情况。
>
>[`502 Bad Gateway`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/502)
>
>此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。



##  XMLHttpRequest

#### open方法：

​	初始化一个请求。标准用法：xhrReq.open(method, url, async？, user？, password？); 

send方法：

​	发送请求：标准用法：XMLHttpRequest.send(FormData data);

#### readyState：

​	**XMLHttpRequest.readyState** 属性返回一个 XMLHttpRequest 代理当前所处的状态。一个 XHR 代理总是处于下列状态中的一个：

| 值   | 状态               | 描述                                                |
| ---- | ------------------ | --------------------------------------------------- |
| `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
| `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
| `3`  | `LOADING`          | 下载中； `responseText` 属性已经包含部分数据。      |
| `4`  | `DONE`             | 下载操作已完成。                                    |

#### XMLHttpRequest请求案例：

```javascript
let xhr=new XMLHttpRequest();//新创建一个XMLHttpRequest。此时xhr的responseState==0;
let data={};
let methods='get';
xhr.open(methods,url);//此时xhr的responseState==1;

//设置请求头必须在open之后，send之前。
xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');//默认
xhr.setRequestHeader('Content-type','multipart/form-data');//post提交文件类型时使用
xhr.setRequestHeader('Content-type','application/json');//传输json时使用

xhr.send(data);//此时xhr的respnseState==2;
xhr.onreadystatechange(response=>{
    if(this.readystate == 4){//当下载已经完成
        if(this.status==200){
            console.log("请求完成",response);
        }else{
            console.log("请求失败",response);
        }
    }
})
```



用Promise的方式封装一个XMLHttpRequest：

```javascript
function PromiseRequest(options){
    return new Promise((resolve,reject)=>{
        const handler=(res)=>{
            if(this.readystate!=4){
                return;
            }else{
                if(this.status==200){//只有当status==200而且readyState等于200时，处理resolve逻辑
                    resolve(res);
                }else{
                    reject(res);
                }
            }
        }
        
        let xhr=new XMLHttpRequest();
        xhr.open(options.methods,options.url);
        xhr.send(options.data);
        xhr.onreadystatechange=handler;
    }
}
                       
PromiseRequest(options).then(res=>{
        console.log(res);//根据正确结果进行处理
    }).catch(err=>{
        console.log(err);//根据错误结果进行处理
    });
```



也可以直接使用XMLHttpRequest对象的事件来处理，简化代码：

```javascript
let xhr=new XMLHttpRequest();
xhr.onload=successFunction;	//处理相应成功事件
xhr.onerror=failFunction;	//处理错误事件
xhr.ontimeout=timeoutFunction;	//处理请求超时事件
```



