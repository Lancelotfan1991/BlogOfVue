function extend(sup, base) {
  var descriptor = Object.getOwnPropertyDescriptor(
      base.prototype, "constructor"
  );
 //实现继承，将子构造函数的prototype指向父对象
  base.prototype = Object.create(sup.prototype);

  var handler = {
      construct: function(target, args) {
        console.log('construct')
          var obj = Object.create(base.prototype);
          this.apply(target, obj, args);
          return obj;
      },
      apply: function(target, that, args) {
          console.log('applyed');
          sup.apply(that, args);
          base.apply(that, args);
      }
  };
  var proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, "constructor", descriptor);
  return proxy;
}

var Person = function (name) {
  this.name = name
};

var Boy = extend(Person, function (name, age) {
  this.age = age;
});

Boy.prototype.sex = "M";

var Peter = new Boy("Peter", 13);
console.log(Peter.sex);  // "M"
console.log(Peter.name); // "Peter"
console.log(Peter.age);  // 13

//奇葩面试题
const list=[1,2,3];
const square=num=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(num*num);
    },1000)
  })
}

function test(){
  list.forEach(async ele=>{
    let res=await square(ele);
    console.log(res);
  }
  )
}

test();