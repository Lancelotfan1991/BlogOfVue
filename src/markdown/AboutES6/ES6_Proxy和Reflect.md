# Proxy和Reflect

>文中案例部分，引自MDN，并添加了注释。

### Proxy的作用

给原有的对象外包裹一个代理，当我们尝试调用这个Proxy对象的静态方法时，等同于对包裹的对象进行操作，同时，我们可以在操作的同时，进行拦截，值修正和附加属性，也可以灵活的定义对象的属性。

### 案例：

#### 案例1：通过构造一个新的构造函数来扩展一个已有的构造函数

在这个例子中，当我们定义一个Person时，只能传入和设置用户的name属性。

我们现在想要定义一个Boy构造函数，并允许传入和设置一个新的属性：age，这个时候我们可以使用proxy来代理这个Person构造函数。

```javascript
function extend(sup, base) {
    var descriptor = Object.getOwnPropertyDescriptor(
        base.prototype, "constructor"
    );
 	//实现继承，将子构造函数的prototype指向父对象的prototype
    base.prototype = Object.create(sup.prototype);
  
    var handler = {
        construct: function(target, args) {
            var obj = Object.create(base.prototype);
            this.apply(target, obj, args);
            return obj;
        },
        apply: function(target, that, args) {
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
```

#### 案例2：通过属性查找数组中的指定对象（对get进行拦截）

我们构建了一个数组，数组的构成是一些对象。

按照以前的方法，我们仅仅能够通过下标来获取数组中的对象。

现在我们可以通过代理，来实现更灵活地获取数组中的对象。

```javascript
let products = new Proxy([
  { name: 'Firefox'    , type: 'browser' },
  { name: 'SeaMonkey'  , type: 'browser' },
  { name: 'Thunderbird', type: 'mailer' }
], {
  get: function(obj, prop) {
    // 默认行为是返回属性值， prop ?通常是一个整数
    if (prop in obj) {
      return obj[prop];
    }

    // 获取 products 的 number; 它是 products.length 的别名
    if (prop === 'number') {
      return obj.length;
    }
	
    //创建一个result的对象，用于存储匹配到的产品。
    //创建一个types的集合，获取所有的产品类型，每一个类型中包含了一个数组，数组里是符合类型的产品
    let result, types = {};

    for (let product of obj) {
      if (product.name === prop) {
        result = product;
      }
      if (types[product.type]) {
        types[product.type].push(product);
      } else {
        types[product.type] = [product];
      }
    }

    // 通过 name 获取 product
    if (result) {
      return result;
    }

    // 通过 type 获取 products
    if (prop in types) {
      return types[prop];
    }

    // 获取 product type
    if (prop === 'types') {
      return Object.keys(types);
    }

    return undefined;
  }
});

//完成以上操作后，对这个数组的操作得到了极大的优化。
//我们可以采用各种方式来获取数组中的对象。
console.log(products[0]); // { name: 'Firefox', type: 'browser' }
console.log(products['Firefox']); // { name: 'Firefox', type: 'browser' }
console.log(products['Chrome']); // undefined
console.log(products.browser); // [{ name: 'Firefox', type: 'browser' }, { name: 'SeaMonkey', type: 'browser' }]
console.log(products.types); // ['browser', 'mailer']
console.log(products.number); // 3
```

案例3：值修正及附加属性 

下面这个案例演示了，当我们在传入要给

```javascript
let products = new Proxy({
  browsers: ['Internet Explorer', 'Netscape']
}, {
  get: function(obj, prop) {
    // 附加一个属性
    if (prop === 'latestBrowser') {
      return obj.browsers[obj.browsers.length - 1];
    }

    // 默认行为是返回属性值
    return obj[prop];
  },
  set: function(obj, prop, value) {
    // 附加属性
    if (prop === 'latestBrowser') {
      obj.browsers.push(value);
      return;
    }

    // 如果不是数组，则进行转换
    if (typeof value === 'string') {
      value = [value];
    }

    // 默认行为是保存属性值
    obj[prop] = value;

    // 表示成功
    return true;
  }
});

console.log(products.browsers); // ['Internet Explorer', 'Netscape']
products.browsers = 'Firefox';  // 如果不小心传入了一个字符串
console.log(products.browsers); // ['Firefox'] <- 也没问题, 得到的依旧是一个数组

products.latestBrowser = 'Chrome';
console.log(products.browsers);      // ['Firefox', 'Chrome']
console.log(products.latestBrowser); // 'Chrome'
```

