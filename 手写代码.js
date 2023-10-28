//快排
function quickSort(arr, r, l) {
  let middle = arr.lenght / 2;
  let left = l;
  let right = r;
  while (left < right) {
    //首先查找出middle左边和右边的需要呼唤的元素
    while (arr[left] < arr[middle]) {
      left++;
    }
    while (arr[right] > arr[middle]) {
      right--;
    }
    if (right <= left) {
      break;
    }
    arr[right] = arr[right] + arr[left];
    arr[left] = arr[right] - arr[left];
    arr[right] = arr[right] - arr[left];
  }
  if (left < r) {
    quickSort(arr, left, r);
  }
  if (right > l) {
    quickSort(arr, l, right);
  }
}

//深拷贝
function deepClone(obj) {
  const map = new Map(); //用map存引用地址，防止循环引用
  const clone = (target) => {
    if (map.has(target)) return map.get(target); //存在循环引用直接返回clone过后的地址
    const type = Object.prototype.toString
      .call(target)
      .replace(/\[object (\w+)\]/, '$1'); //获取元素类型
    const strategy = {
      ArrayOrObject() {
        const res = new target.constructor();
        map.set(target, res); //将引用地址存入，防止循环引用
        for (const [k, v] of Object.entries(obj)) {
          res[k] = deepClone(v);
        }
        return res;
      },
      RegExp() {
        return new RegExp(target);
      },
      Date() {
        return new Date(target);
      },
      Map() {
        const newMap = new Map();
        target.forEach((k, v) => {
          newMap.set(deepClone(k), deepClone(v));
        });
        return newMap;
      },
      Set() {
        const newSet = new Set();
        target.forEach((item) => {
          newSet.add(item);
        });
        return newSet;
      },
      Symbol() {
        //Symbol.prototype.valueOf 会返回一个symbol对象
        //Object新建一个symbol对象
        return Object(Symbol.prototype.valueOf.call(target));
      },
    };
    if (['Array', 'Object'].includes(type)) {
      return strategy.ArrayOrObject();
    } else {
      return strategy[type] ? strategy[type]() : target;
    }
  };
  return clone(obj);
}

//防抖
function debounce(fn, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(this, arguments);
    }, delay);
  };
}

//节流
function throttle(fn, delay) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}

//数组乱序
function shuffle(arr) {
  let len = arr.length;
  while (len > 1) {
    let index = (parseInt(Math.random().len--)[(arr[index], arr[len])] =
      //定义一个随机index
      [arr[len], arr[index]]); //将当前index和len下标的元素互换
  }
  return arr;
}
//数组去重
// Array.from(new Set(arr))
// [...new Set(arr)]
function removeDup(arr) {
  return arr.reduce((pre, cur) => {
    if (!pre.includes(cur)) {
      return pre.concat(cur);
    } else {
      return pre;
    }
  }, []);
}

function removeDup(arr) {
  let map = new Map();
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!map[arr[i]]) {
      result.push(arr[i]);
      map.set(arr[i], true);
    }
  }
  return result;
}

//实现数组的flat方法
Array.prototype.flat = function (depth) {
  return this.reduce((pre, cur) => {
    //注意这个[cur],concat会去掉子元素的[]
    return pre.concat(
      Array.isArray(cur) && depth >= 1 ? cur.flat(depth - 1) : [cur]
    );
  }, []);
};
//实现数组map方法
Array.prototype.map = function (fn) {
  if (typeof fn !== 'function') {
    throw new Error(`${fn} is not a function`);
  }
  let arr = this;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn.call(null, arr[i], i, arr));
  }
  return result;
};
//实现数组的fillter方法
Array.prototype.filter = function (fn) {
  if (typeof fn !== 'function') {
    throw new Error(`${fn} is not a function`);
  }
  let arr = this;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let temp = fn.call(null, arr[i], i, arr);
    if (temp) {
      result.push(arr[i]);
    }
  }
  return result;
};

//实现call,apply,bind函数

//aa.call(this, ss, rr)
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new Error('this is not a function');
  }
  let context = context || window;
  context.fn = this;
  args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new Error('this is not a function');
  }
  let context = context || window;
  let result;
  context.fn = this;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('this is not a funtion');
  }
  let _this = this;
  let args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      // 因为返回了⼀个函数，我们可以 new F()，所以需要判断
      return new _this(...args, ...arguments);
    }
    return _this.call(context, ...args, ...arguments);
  };
};

//实现继承
// ES5
function Parent(name, age) {
  this.name = name;
  this.age = age;
}
Parent.prototype.say = function () {
  console.log('I am' + this.name);
};

/* 组合继承 */
function Child(name, age, sex) {
  Parent.call(this, name, age); //执行父类构造函数，继承父类属性
  this.sex = sex;
}

Child.prototype = Object.create(Parent.prototype); //子类原型指向父类原型，继承原型上的方法
Child.prototype.constructor = Child;

// ES6
class Parent {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Child extends Parents {
  constructor(name, age, sex) {
    super(name, age);
    this.sex = sex; // 必须先调用super，才能使用this
  }
}

//实现EventEmitter
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, cb) {
    if (!this.events[name]) {
      this.events[name] = [cb];
    } else {
      this.events[name].push(cb);
    }
  }
  emit(name, ...arg) {
    if (this.events[name]) {
      this.events[name].forEach((fn) => {
        fn.call(this, ...arg);
      });
    }
  }
  off(name, cb) {
    if (this.events[name]) {
      this.events[name] = this.events[name].filter((fn) => {
        return fn != cb;
      });
    }
  }
  once(name, fn) {
    var onlyOnce = () => {
      fn.apply(this, arguments);
      this.off(name, onlyOnce);
    };
    this.on(name, onlyOnce);
    return this;
  }
}

//实现instanceof
function myInstanceof(left, right) {
  let proto = left.__proto__; //左边是实例因此是__proto__
  let protoType = right.prototype; //右边是构造函数因此是prototyp
  while (true) {
    if (proto === protoType) {
      return true;
    }
    if (proto === null) {
      return false;
    }
    proto = proto.__proto__;
  }
}
//new一个对象的过程
// 当我们new一个对象的时候，具体执行的是什么？MDN上给的说明如下：
// 创建一个空的简单 JavaScript 对象（即{}）；
// 链接该对象（即设置该对象的构造函数）到另一个对象 ；
// 将步骤1新创建的对象作为 this 的上下文 ；
// 如果该函数没有返回对象，则返回 this。
function myNew() {
  var fn = this; //定义一个别名
  var obj = Object.create(fn.prototype); //创建一个obj其__proto__指向fn的prototype
  var res = fn.apply(obj, arguments); //执行父类构造函数
  return typeof res == 'object' ? result : obj;
}
Function.prototype.myNew = myNew;

//实现jsonp
function jsonp(obj) {
  const { url, data } = obj;
  if (!url) return;
  return new Promise((resolve, reject) => {
    const cbFn = `jsonp_${Date.now()}`;
    data.callback = cbFn;
    const head = document.querySelector('head');
    const script = document.createElement('script');
    const src = `${url}?${data2Url(data)}`;
    console.log('scr', src);
    script.src = src;
    head.appendChild(script);

    window[cbFn] = function (res) {
      res ? resolve(res) : reject('error');
      head.removeChild(script);
      window[cbFn] = null;
    };
  });
}

const dataurl = (data) => {
  return Object.keys(data)
    .reduce((pre, cur) => {
      pre.push(`${cur}=${data[cur]}`);
    }, [])
    .join('&');
};

//实现一个sleep函数
function sleep(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, delay * 1000);
  });
}
//实现promise.all
Promise.all = function (promiseArr) {
  if (promiseArr[Symbol.iterator] === undefined) {
    throw new Error('promiseArr must be iteratorable');
  }
  return new Promise((resolve, reject) => {
    let result = []; //定义一个空数组接受结果
    let count = 0; //定义一个count表示当前执行的数量
    promiseArr.forEach((item, index) => {
      Promise.resolve(item).then(
        (val) => {
          result[index] = val;
          count++;
          if (count === promiseArr.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};
//实现promise.allSettled
Promise.allSettled = function (promiseArr) {
  if (promiseArr[Symbol.iterator] === undefined) {
    throw new Error('promiseArr must be iteratorable');
  }
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;
    promiseArr.forEach((item, index) => {
      Promise.resolve(item).then(
        (val) => {
          count++;
          result[index] = val;
          if (count === promiseArr.length) {
            resolve(result);
          }
        },
        (err) => {
          count++;
          result[index] = err;
          if (count === promiseArr.length) {
            resolve(result);
          }
        }
      );
    });
  });
};
//实现Promise.race
Promise.race = function (promiseArr) {
  if (promiseArr[Symbol.iterator] === undefined) {
    throw new Error('promiseArr must be iteratorable');
  }
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item, index) => {
      Promise.resolve(item).then(
        (val) => {
          resolve(val);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};
//实现promise.retry
Promise.retry = function (promise, times, delay) {
  return new Promise((resolve, reject) => {
    let action = function () {
      //定义一个函数执行穿进来的promise，如果失败就继续重试该函数，直到没有次数
      Promise.resolve(promise).then(
        (val) => {
          resolve(val);
        },
        (err) => {
          if (times === 0) {
            reject(err);
          } else {
            times--;
            setTimeout(() => {
              action();
            }, delay);
          }
        }
      );
    };
    action();
  });
};
//将一个同步回调封装成一个promise
function promisify(fn) {
  return (...args) => {
    //该函数返回的应该是一个函数，而该返回的函数返回的是一个promise
    return new Promise((resolve, reject) => {
      fn.apply(this, [
        ...args,
        (err, res) => {
          return err ? reject(err) : resolve(res);
        },
      ]);
    });
  };
}
//实现函数柯里化
function curry(fn, args) {
  var length = fn.length;
  var args = args || [];
  return function () {
    newArgs = args.concat(...arguments);
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  };
}
// 调用
const foo = (a, b, c) => a * b * c;
curry(foo)(2, 3, 4); // -> 24
curry(foo, 2)(3, 4); // -> 24
curry(foo, 2, 3)(4); // -> 24
curry(foo, 2, 3, 4)(); // -> 24
//实现一个并发请求控制函数，限制并发数
function createRequest(tasks = [], pool) {
  pool = pool || 5; //限制并发的数量
  let results = [];
  let running = 0; // 当前运行个数
  let resultsLength = tasks.length; // 用来判断最后的是否全部成功
  return new Promise((resolve, reject) => {
    run();
    function run() {
      while (running < pool && tasks.length) {
        // 这个wile循环保证 一直有pool个请求在进行
        running++;
        let task = tasks.shift();
        task()
          .then((result) => {
            results.push(result);
          })
          .finally(() => {
            running--;
            run();
          });
      }
      if (results.length === resultsLength) {
        // 全部执行结束
        resolve(results);
      }
    }
  });
}

//实现一个函数add(3)(4)(5)(6)(7)(8);
var add = function (m) {
  var temp = function (n) {
    return add(m + n);
  };

  temp.toString = function () {
    return m;
  };

  return temp;
};
//实现add(1)(4, 5, 6)(7, 8)(10)=41
function add(...args) {
  function inner(...otherArgs) {
    args = [...args, ...otherArgs];
    return inner;
  }
  inner.toString = () => {
    return args.reduce((acc, cur) => acc + cur, 0);
  };
  return inner;
}
//但代码量极其少而精，重点技术在于：作用域、交替、匿名函数、toString的巧妙。
// 执行temp(5)，这个函数内执行add(m+n)，n是此次传进来的数值5，m值还是上一步中的7，
// 所以add(m+n)=add(7+5)=add(12)，此时m=12，并且返回temp函数
// 4、关键性一步来了，后面没有传入参数，等于返回的temp函数不被执行而是打印，
// 了解JS的朋友都知道对象的toString是修改对象转换字符串的方法，
// 因此代码中temp函数的toString函数return m值，而m值是最后一步执行函数时的值m=12，所以返回值是12。

//redux的compose
function compose(...fns) {
  if (fns.length === 1) {
    return fns[0]();
  }
  return fns.reduce((prev, next) => {
    return (...args) => next(prev(...args));
  });
}

function compose(...fns) {
  return (x) => {
    return fns.reduceRight((arg, fn) => {
      return fn(arg);
    }, x);
  };
}
// compose(f,g)(x) === f(g(x))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m,n)(x) === f(g(m(n(x))))

//koa的compose实现
function compose(middlewares) {
  return function (ctx, next) {
    //index是为了防止重复调next
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      index = i;
      let fn = middlewares[i];
      if (i === middlewares.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
}

//判断一个元素是否在可视区域内
//通过getBoundingClientRect方法判断
// getBoundingClientRect 方法返回的是一个DOMRect对象
// DOMRect 对象包含了一组用于描述边框的只读属性left、top、right、bottom、x、y以及width、height，单位为像素
var isTopInWindow = 0 < top && top < windowHeight;

var isBottomInWindow = 0 < bottom && bottom <= windowHeight;
//数字转换为千分位的方法
//方法一（正则）?=n	匹配任何其后紧接指定字符串 n 的字符串。
//零宽断言正如它的名字一样，是一种零宽度的匹配，
//它匹配到的内容不会保存到匹配结果中去，最终匹配结果只是一个位置而已。
str.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
  return s + ',';
});

//实现堆排序
// 交换两个节点
function swap(A, i, j) {
  let temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}
function shiftDown(A, i, length) {
  let temp = A[i]; // 当前父节点// j<length 的目的是对结点 i 以下的结点全部做顺序调整
  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    temp = A[i]; // 将 A[i] 取出，整个过程相当于找到 A[i] 应处于的位置
    if (j + 1 < length && A[j] < A[j + 1]) {
      j++; // 找到两个孩子中较大的一个，再与父节点比较
    }
    if (temp < A[j]) {
      swap(A, i, j); // 如果父节点小于子节点:交换；否则跳出
      i = j; // 交换后，temp 的下标变为 j
    } else {
      break;
    }
  }
} // 堆排序
function heapSort(A) {
  // 初始化大顶堆，从第一个非叶子结点开始
  for (let i = Math.floor(A.length / 2 - 1); i >= 0; i--) {
    shiftDown(A, i, A.length);
  } // 排序，每一次for循环找出一个当前最大值，数组长度减一
  for (let i = Math.floor(A.length - 1); i > 0; i--) {
    swap(A, 0, i); // 根节点与最后一个节点交换
    shiftDown(A, 0, i);
  } // 从根节点开始调整，并且最后一个结点已经为当
} // 前最大值，不需要再参与比较，所以第三个参数
// 为 i，即比较到最后一个结点前一个即可

//如何解决0.1+0.2不等于0.3的问题
//可以转为整数求解
function aa(num1, num2) {
  const len1 = (num1.toString().split('.')[1] || '').length;
  const len2 = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(len1, len2));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}

//实现模板语法
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; //模板字符串正则
  if (reg.test(template)) {
    //判断模板里是否还有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return render(template, data);
  }
  return template;
}

//实现LRU缓存
//利用map的性质进行存储
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.map = new Map();
  this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    let temp;
    temp = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, temp);
    return temp;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  //put的时候都是需要set的，如果有值先把key删了，
  //set之后判断是不是超出size了，超出了就删除第一个值
  if (this.map.has(key)) {
    this.map.delete(key);
  }
  this.map.set(key, value);
  if (this.map.size > this.capacity) {
    this.map.delete(this.map.keys().next().value);
  }
};

//实现虚拟dom到真实dom的转变

class Element {
  constructor(tagName, props, children) {
    (this.tagName = tagName), (this.props = props);
    this.children = children;
  }
  render() {
    let el = document.createElement(this.tagName);
    let props = this.props;
    for (let propsName of props) {
      el.setAttribute(propsName, props[propsName]);
    }
    let children = this.children || [];
    children.forEach((item) => {
      let childEl;
      if (item instanceof Element) {
        childEl = this.render(item);
      } else {
        childEl = document.createTextNode(item);
      }
      el.appendChild(childEl);
    });
    return el;
  }
}

//实现一个task类，new Task('test').firstSleep(3).sleep(5).eat('dinner')
//todo
class Task {
  constructor(name) {
    this.tasks = [];
    this.tasks.push(() => {
      console.log(name);
      this.next();
    });
    setTimeout(() => {
      this.next();
    }, 0);
  }
  firstSleep(timer) {
    this.tasks.unshift(() => {
      setTimeout(() => {
        console.log('first sleep');
        this.next();
      }, timer * 1000);
    });
    return this;
  }
  sleep(timer) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log('sleep');
        this.next();
      }, timer * 1000);
    });
    return this;
  }
  eat(type) {
    this.tasks.push(() => {
      console.log(type);
      this.next();
    });
    return this;
  }
  next() {
    let fn = this.tasks.shift(); //每次从队头取出任务执行
    fn && fn();
  }
}

//手写reduce
Array.prototype.reduce = function (callback, initialVal) {
  let acc = initialVal || this[0];
  let startIndex = initialVal ? 0 : 1;
  for (let i = startIndex; i < this.length; i++) {
    res = callback(acc, this[i], i, this);
  }
  return res;
};

//实现一个async函数
/* 
generatorFunc:是一个生成器函数
 */
function asyncToGenerator(generatorFunc) {
  //调用生成器函数，产生一个迭代器
  const gen = generatorFunc.apply(this, arguments);
  return new Promise((resolve, reject) => {
    function step(key, val) {
      //执行迭代器，获取结果
      const genRes = gen[key](val);
      const { value, done } = genRes;
      if (done) {
        return resolve(value);
      } else {
        return Promise.resolve(value).then((val) => step('next', val));
      }
    }
    step('next');
  });
}

//实现一个数据绑定
const newObj = new Proxy(
  {},
  {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      /* 处理设置值的逻辑 */
      return Reflect.set(target, key, value, receiver);
    },
  }
);

/**
 * 每个csv文件转成一个person对象，然后根据父子关系构建树
 */
const transferTree = () => {
  // interface Person {
  //   name: string
  //   age: number
  //   parent: string | null
  //   children?: Person[]
  // }
  // csv文件转成树结构
  const csv = `
    name,age,parent
    Bob,30,David
    David,60,
    Anna,10,Bob
  `;
  const change = (csv) => {
    const lineArr = csv
      .trim()
      .split('\n')
      .map((item) => item.trim().split(','));
    const data = lineArr.slice(1);
    const people = {};
    for (const item of data) {
      people[item[0]] = {
        name: item[0],
        age: item[1],
        parent: item[2],
        children: [],
      };
    }
    console.log(people);
    for (const person of Object.values(people)) {
      if (person.parent) {
        //找到people中对应的父亲元素，将子节点加进去即可
        const parent = people[person.parent];
        parent.children.push(person);
      }
    }
    //过滤下没父节点说明就是树的头节点了
    return Object.values(people).filter((person) => !person.parent);
  };
  return change(csv);
};

//用settimeout实现setinterval
function test(fn, delay) {
  fn.call(null, arguments);
  setTimeout(() => {
    test(fn, delay);
  }, delay);
}

function createInterval() {
  let timerId;
  return function mySetInterval(cb, delay) {
    const fn = () => {
      cb();
      timerId = setTimeout(fn, delay);
    };
    timerId = setTimeout(fn, delay);
    return timerId;
  };
}

//对象扁平化
function objFlat(entryObj) {
  const res = {};
  function _objFlat(obj, pre = '', isArray = false) {
    for ([k, v] of Object.entries(obj)) {
      if (v !== undefined && v !== null) {
        if (Array.isArray(v)) {
          //注意别直接去改pre，因为是递归，会有闭包问题
          const temp = isArray ? pre + `[${k}]` : pre + k;
          _objFlat(v, temp, true);
        } else if (typeof v === 'object') {
          const temp = isArray ? pre + `[${k}].` : pre + k + '.';
          _objFlat(v, temp);
        } else {
          const temp = isArray ? pre + `[${k}]` : pre + k;
          res[temp] = v;
        }
      }
    }
  }
  _objFlat(entryObj);
  return res;
}

//数组转树
// let data = [
//   { id: 0, parentId: null, name: '生物' },
//   { id: 1, parentId: 0, name: '动物' },
//   { id: 2, parentId: 0, name: '植物' },
//   { id: 3, parentId: 0, name: '微生物' },
//   { id: 4, parentId: 1, name: '哺乳动物' },
//   { id: 5, parentId: 1, name: '卵生动物' },
//   { id: 6, parentId: 2, name: '种子植物' },
//   { id: 7, parentId: 2, name: '蕨类植物' },
//   { id: 8, parentId: 4, name: '大象' },
//   { id: 9, parentId: 4, name: '海豚' },
//   { id: 10, parentId: 4, name: '猩猩' },
//   { id: 11, parentId: 5, name: '蟒蛇' },
//   { id: 12, parentId: 5, name: '麻雀' }
// ]
const transferArrToTree = (data) => {
  let res;
  const map = {}; //将数组中每项根据id组合起来,方便找每一项的爸爸
  for (const item of data) {
    map[item.id] = item;
  }
  console.log('map', map);
  for (const item of Object.values(map)) {
    const parent = map[item.parentId];
    if (parent) {
      //如果这项有爸爸，那么将其放入爸爸的子元素中
      (parent.children || (parent.children = [])).push(item);
    } else {
      res = item;
    }
  }
  return res;
};

//树转数组
// let node = {
//   id: 0,
//   parentId: null,
//   name: '生物',
//   children: [
//     {
//       id: 1,
//       parentId: 0,
//       name: '动物',
//       children: [
//         {
//           id: 4,
//           parentId: 1,
//           name: '哺乳动物',
//           children: [
//             {
//               id: 8,
//               parentId: 4,
//               name: '大象',
//             },
//             {
//               id: 9,
//               parentId: 4,
//               name: '海豚',
//             },
//             {
//               id: 10,
//               parentId: 4,
//               name: '猩猩',
//             },
//           ],
//         },
//         {
//           id: 5,
//           parentId: 1,
//           name: '卵生动物',
//           children: [
//             {
//               id: 11,
//               parentId: 5,
//               name: '蟒蛇',
//             },
//             {
//               id: 12,
//               parentId: 5,
//               name: '麻雀',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 2,
//       parentId: 0,
//       name: '植物',
//       children: [
//         {
//           id: 6,
//           parentId: 2,
//           name: '种子植物',
//         },
//         {
//           id: 7,
//           parentId: 2,
//           name: '蕨类植物',
//         },
//       ],
//     },
//     {
//       id: 3,
//       parentId: 0,
//       name: '微生物',
//     },
//   ],
// };
const transferTreeToArr = (node) => {
  //广度优先遍历
  const res = [];
  const queue = [node]; //节点队列
  while (queue.length) {
    const item = queue.shift(); //取出第一个元素
    res.push({
      id: item.id,
      parentId: item.parentId,
      name: item.name,
    });
    if (item.children) {
      for (const child of item.children) {
        queue.push(child); //子节点加入队列尾部
      }
    }
  }
  return res;
};

const transferDfs = (node) => {
  //深度优先遍历
  const res = [];
  const dfs = (node) => {
    if (!node) {
      return;
    }
    res.push({
      id: node.id,
      parentId: node.parentId,
      name: node.name,
    });
    if (node.children) {
      for (const child of node.children) {
        dfs(child); //遍历子节点
      }
    }
  };
  dfs(node);
  return res;
};
