## Replace方法与正则



#### 1，replace字符串中实现替换的方法（一般都是伴随正则一起使用的）

```javascript
let str="zhufeng@2019|zhufeng@2020"
//把"zhufeng"替换成汉字"珠峰"

//不使用正则
str=str.replace("zhufeng","珠峰");
str=str.replace("zhufeng","珠峰");
console.log(str);

//使用正则
str.replace(/zhufeng/g,"珠峰");
console.log("珠峰")
```



#### 2，一些不使用正则的情况

```javascript
let str="zhufeng@2019|zhufeng@2020";

//需求2：把“zhufeng”替换成“zhufengpeixun”；

//不使用正则
str=str.replace("zhufeng","zhufengpeixun").replace("zhufeng","zhufengpeixun");
console.log(str);

str="zhufeng@2019|zhufeng@2020";
//使用正则
str=str.replace(/zhufeng/g,"zhufengpeixun")
console.log(str);

```



#### 3，案例：把时间字符串进行处理

```javascript
let time="2019-08-13"
//=>变为"2019年08月13日"

let reg=/^(\d{4})-(\d{1,2})-(\d{1,2})$/;

//方法1
time=time.replace(reg,"$1年$2月$3日")
console.log(time);

//方法2
time=time.replace(reg,(...arg)=>{
    //这里的$1-2-3是我们自己定义的变量
    let [,$1,$2,$3]=arg;
    $2.length<2?"0"+$2:null;
    $3.length<0?"0"+$3:null;
    return $1+"年"+$2+'月'+$3+"日"
});
//1,首先拿reg和time进行匹配捕获，能匹配到几次就会把传递的函数执行几次
//2,不仅把方法执行，而且replace方法还给方法传递了实参信息（和exec捕获内容一致的信息，大正则匹配的内容，小分组匹配的信息）
//3,函数中我们返回的是什么，就把当前匹配的内容替换成啥
```



#### 4，案例：单词首字母大写

```javascript
let str="good good study , day day up";

let reg=/\b([a-zA-Z])[a-zA-Z]*\b/g
//=>每一次arg：["good","g"],["good","g"],["study","s"]
str=str.replace(reg,(...arg)=>{
    console.log(arg);
	let [content,$1]=arg;
    $1=$1.toUpperCase();
    content=content.substring(1);
    return $1+content;
});
console.log(str);//=>Good Good Study , Day Day Up
```



#### 5，验证一个字符串中，哪个字母出现次数最多，多少次

* 不使用正则

```javascript
let str="zhufengpeixunzhoulaoshihaha";

let obj={};
let index=0;
let resultChar="";
[].forEach.call(str,char=>{
    
    //方法1
    //if(obj.hasOwnProperty(char)) obj[char]++;
    //else obj[char]=1;
    
    //方法2
    if(typeof obj[char] !=="undefined"){
        obj[char] ++;
        if(obj[char] > index){
            index=obj[char]
            resultChar = char
        }
        return;
    }
    obj[char]=1;
});
console.log(obj);
console.log('出现最多的字母',resultChar);
console.log(`${resultChar}出现次数最多`);
```

* 使用正则(我自己的方法)

```javascript
let str="zhufengpeixunzhoulaoshihaha";

let reg=/[a-zA-Z]{1}/g
let obj={};
let biggest="";
let max=1;
str=str.replace(reg,(...arg)=>{
	console.log(arg);
    let [$1] =arg;
    if(typeof obj[$1]!=="undefined") {
        obj[$1]++;
    	if(obj[$1]>max){
            max=obj[$1];
            biggest=$1;
        }
    }
    else obj[$1] = 1
    return $1;
});
console.log(obj);
console.log(biggest);
```

* 数组sort方法

```javascript
let str="zhufengpeixunzhoulaoshihaha";

str=str.split('').sort((a,b)=>a.localeCompare(b)).join('');
console.log(str);

let reg=/([a-zA-Z])\1+/g;
let ary=str.match(reg);
ary.sort((a,b)=>b.length-a.length);
console.log(ary);//=>["hhhhh", "aaa", "uuu", "ee", "ii", "nn", "oo", "zz"]
console.log("出现次数最多的字母",ary[0].slice(0,1),ary[0].length)
```

* 多个正则

```javascript
let str="zhufengpeixunzhoulaoshihaha";
str=str.split('').sort((a,b)=>a.localeCompare(b)).join('');
let time=0;
let reg=new RegExp("([a-zA-Z])\\1{"+time+'}','g');
let res=str.match(reg);
let final=[];
while(res&&res.length>0){
        console.log(res);
    final=res;
    time++;
    reg=new RegExp("([a-zA-Z])\\1{"+time+'}','g');
    res=str.match(reg);
}
console.log(`出现次数最多的字母${final[0].slice(0,1)},出现次数为${final[0].length}`);
```

* 删减字符串

```javascript
let str="zhufengpeixunzhoulaoshihahazzzffff";
let result=[];
let max=0;
let letter="";
let reg;
while(str!="" && max<str.length){
    let oldlength =str.length;
    letter=str.slice(0,1);
    console.log(letter);
    reg=new RegExp(letter,"g");
    str=str.replace(reg,"");//将重复字母删除
    let newlength=str.length;
    let lettercount=oldlength-newlength;//删除字符的出现次数
	if(lettercount > max){
        result=[];
        max=lettercount;
    }
    if(lettercount === max){
        result.push(letter);
    }
}
console.log(`出现次数最多的字母${result},出现次数为${max}`);
```

