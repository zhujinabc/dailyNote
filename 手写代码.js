// ============================================
// 一、排序算法
// ============================================

// 1. 快速排序 (修正版)
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr;
  const pivotIndex = partition(arr, left, right);
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)];
  while (left <= right) {
    while (arr[left] < pivot) left++;
    while (arr[right] > pivot) right--;
    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return left;
}

// ============================================
// 二、防抖与节流
// ============================================

// 1. 防抖函数 (带立即执行选项)
function debounce(fn, delay, immediate = false) {
  let timer;
  return function (...args) {
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);
    if (callNow) {
      fn.apply(this, args);
    }
  };
}

// 2. 节流函数 (带leading和trailing选项)
function throttle(fn, delay, { leading = true, trailing = true } = {}) {
  let timer;
  let lastCallTime = 0;
  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastCallTime);

    if (leading && remaining <= 0) {
      lastCallTime = now;
      fn.apply(this, args);
    }

    clearTimeout(timer);
    if (trailing && remaining > 0) {
      timer = setTimeout(() => {
        lastCallTime = Date.now();
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// 3. 数组乱序 (Fisher-Yates算法)
function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ============================================
// 三、数组去重
// ============================================

//数组去重
// 方法一：Set
// [...new Set(arr)]
// 方法二：reduce
function removeDup(arr) {
  return arr.reduce((pre, cur) => {
    if (!pre.includes(cur)) {
      return pre.concat(cur);
    }
    return pre;
  }, []);
}

// 方法三：Map
function removeDupByMap(arr) {
  const map = new Map();
  return arr.filter((item) => {
    if (!map.has(item)) {
      map.set(item, true);
      return true;
    }
    return false;
  });
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

class Child extends Parent {
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
// 1. 创建一个空的简单 JavaScript 对象（即{}）
// 2. 链接该对象（设置__proto__）到另一个对象（构造函数的prototype）
// 3. 将步骤1新创建的对象作为 this 的上下文
// 4. 如果该函数没有返回对象，则返回 this
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, args);
  return typeof res === 'object' && res !== null ? res : obj;
}

//实现jsonp
function jsonp(options) {
  const { url, data = {} } = options;
  if (!url) return Promise.reject('url is required');
  return new Promise((resolve, reject) => {
    const cbFn = `jsonp_${Date.now()}`;
    data.callback = cbFn;
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.src = `${url}?${objectToUrl(data)}`;
    head.appendChild(script);

    window[cbFn] = function (res) {
      res ? resolve(res) : reject('error');
      head.removeChild(script);
      window[cbFn] = null;
    };
  });
}

//对象转URL参数
function objectToUrl(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

// 别名，保持兼容性
const stringifyUrlParams = objectToUrl;

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

//实现一个函数add(3)(4)(5)(6)(7)(8)
function add(m) {
  const temp = function (n) {
    return add(m + n);
  };
  temp.toString = function () {
    return m;
  };
  return temp;
}

//实现add(1)(4, 5, 6)(7, 8)(10)=41
function addMulti(...args) {
  function inner(...otherArgs) {
    args = [...args, ...otherArgs];
    return inner;
  }
  inner.toString = () => args.reduce((acc, cur) => acc + cur, 0);
  return inner;
}
//但代码量极其少而精，重点技术在于：作用域、交替、匿名函数、toString的巧妙。
// 执行temp(5)，这个函数内执行add(m+n)，n是此次传进来的数值5，m值还是上一步中的7，
// 所以add(m+n)=add(7+5)=add(12)，此时m=12，并且返回temp函数
// 4、关键性一步来了，后面没有传入参数，等于返回的temp函数不被执行而是打印，
// 了解JS的朋友都知道对象的toString是修改对象转换字符串的方法，
// 因此代码中temp函数的toString函数return m值，而m值是最后一步执行函数时的值m=12，所以返回值是12。

//Redux的compose - 函数从右到左执行
function composeRedux(...fns) {
  if (fns.length === 1) {
    return fns[0]();
  }
  return fns.reduce((prev, next) => {
    return (...args) => next(prev(...args));
  });
}
// composeRedux(f,g)(x) === f(g(x))
// composeRedux(f,g,m)(x) === f(g(m(x)))

//Koa的compose实现 - 中间件洋葱模型
function composeKoa(middlewares) {
  return function (ctx, next) {
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

//判断一个元素是否在可视区域内 (通过getBoundingClientRect)
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

//数字转换为千分位的方法
//方法一（正则）?=n 匹配任何其后紧接指定字符串 n 的字符串。
//零宽断言正如它的名字一样，是一种零宽度的匹配，
//它匹配到的内容不会保存到匹配结果中去，最终匹配结果只是一个位置而已。
function toThousands(num) {
  return String(num).replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => s + ',');
}

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
  //广度优先遍历(有个数组能把每层数据存起来)
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

//对象数组去重
const getType = (a) => {
  return Object.prototype.toString.call(a).replace(/\[object (\w+)\]/, '$1');
};

// 简单比较函数
const isEqual = (a, b) => {
  if (getType(a) !== getType(b)) return false;
  if (getType(a) === 'Array') {
    if (a.length !== b.length) return false;
    return a.every((item, i) => item === b[i]);
  }
  if (getType(a) === 'Object') {
    const aArr = Object.keys(a);
    if (aArr.length !== Object.keys(b).length) return false;
    return aArr.every((k) => isEqual(a[k], b[k]));
  }
  return a === b;
};

// 对象数组去重
const uniqueArray = (arr) => {
  return arr.reduce((acc, cur) => {
    const idx = acc.findIndex((item) => isEqual(item, cur));
    if (idx === -1) {
      acc.push(cur);
    }
    return acc;
  }, []);
};

// ============================================
// 补充常见前端面试手写题
// ============================================

// 1. 手写Promise
class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.status === 'fulfilled') {
        fulfilledMicrotask();
      } else if (this.status === 'rejected') {
        rejectedMicrotask();
      } else {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }
    if (x instanceof MyPromise) {
      x.then(resolve, reject);
    } else if (typeof x === 'object' && x !== null) {
      let then;
      try {
        then = x.then;
      } catch (error) {
        return reject(error);
      }
      if (typeof then === 'function') {
        let called = false;
        try {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } catch (error) {
          if (called) return;
          reject(error);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        return MyPromise.resolve(onFinally()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(onFinally()).then(() => {
          throw reason;
        });
      }
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }
}

// 2. Object.create实现
Object.myCreate = function (proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null');
  }
  function F() {}
  F.prototype = proto;
  const obj = new F();
  if (proto === null) {
    obj.__proto__ = null;
  }
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }
  return obj;
};

// 3. Object.assign实现
Object.myAssign = function (target, ...sources) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  const to = Object(target);
  sources.forEach((source) => {
    if (source != null) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          to[key] = source[key];
        }
      }
    }
  });
  return to;
};

// 4. Object.is实现
Object.myIs = function (a, b) {
  if (a === b) {
    // 处理+0和-0的情况
    return a !== 0 || 1 / a === 1 / b;
  }
  // 处理NaN的情况
  return a !== a && b !== b;
};

// 5. Array.isArray实现
Array.myIsArray = function (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};

// 6. Array.prototype.forEach实现
Array.prototype.myForEach = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      callback.call(thisArg, arr[i], i, arr);
    }
  }
};

// 7. Array.prototype.every实现
Array.prototype.myEvery = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && !callback.call(thisArg, arr[i], i, arr)) {
      return false;
    }
  }
  return true;
};

// 8. Array.prototype.some实现
Array.prototype.mySome = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      return true;
    }
  }
  return false;
};

// 9. Array.prototype.find实现
Array.prototype.myFind = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
};

// 10. Array.prototype.findIndex实现
Array.prototype.myFindIndex = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
};

// 11. Array.prototype.includes实现
Array.prototype.myIncludes = function (searchElement, fromIndex = 0) {
  const arr = this;
  const len = arr.length;
  let i = fromIndex >= 0 ? fromIndex : len + fromIndex;
  i = Math.max(i, 0);
  for (; i < len; i++) {
    // 使用SameValueZero比较
    if (
      arr[i] === searchElement ||
      (Number.isNaN(arr[i]) && Number.isNaN(searchElement))
    ) {
      return true;
    }
  }
  return false;
};

// 12. Array.prototype.indexOf实现
Array.prototype.myIndexOf = function (searchElement, fromIndex = 0) {
  const arr = this;
  const len = arr.length;
  let i = fromIndex >= 0 ? fromIndex : len + fromIndex;
  i = Math.max(i, 0);
  for (; i < len; i++) {
    if (arr[i] === searchElement) {
      return i;
    }
  }
  return -1;
};

// 13. String.prototype.trim实现
String.prototype.myTrim = function () {
  return this.replace(/^\s+|\s+$/g, '');
};

// 14. 解析URL参数
function parseUrlParams(url) {
  const result = {};
  const queryString = url.split('?')[1];
  if (!queryString) return result;
  const pairs = queryString.split('&');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    result[decodeURIComponent(key)] = decodeURIComponent(value || '');
  }
  return result;
}

// 15. 手写Object.freeze
Object.myFreeze = function (obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const desc = Object.getOwnPropertyDescriptor(obj, name);
    if (desc && 'value' in desc) {
      Object.defineProperty(obj, name, {
        ...desc,
        writable: false,
        configurable: false,
      });
    }
  }
  return Object.preventExtensions(obj);
};

// 17. 手写浅拷贝
function shallowClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = obj[key];
    }
  }
  return clone;
}

// 18. 冒泡排序
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 19. 选择排序
function selectionSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

// 20. 插入排序
function insertionSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

// 21. 归并排序
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);

  function merge(left, right) {
    const result = [];
    let i = 0,
      j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}

// 22. 二分查找
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// 23. 斐波那契数列 - 带缓存
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// 24. 函数记忆化
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 25. 只执行一次的函数
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

// 26. 偏函数
function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn.apply(this, [...presetArgs, ...laterArgs]);
  };
}

// 27. 管道函数 (从左到右执行)
function pipe(...fns) {
  return function (x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

// 28. lodash.get - 安全获取嵌套属性
function get(obj, path, defaultValue = undefined) {
  const keys = Array.isArray(path) ? path : path.split('.');
  let result = obj;
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) return defaultValue;
  }
  return result;
}

// 29. lodash.set - 设置嵌套属性
function set(obj, path, value) {
  const keys = Array.isArray(path) ? path : path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = /^\d+$/.test(keys[i + 1]) ? [] : {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return obj;
}

// 30. 数组扁平化 (非递归实现)
function flattenDeep(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  return result;
}

// 31. 数组分块
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// 32. 数组去重 (对象数组根据key)
function uniqueBy(arr, key) {
  const seen = new Set();
  return arr.filter((item) => {
    const val = typeof key === 'function' ? key(item) : item[key];
    if (seen.has(val)) {
      return false;
    }
    seen.add(val);
    return true;
  });
}

// 33. 发布订阅模式
class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => this.unsubscribe(event, callback);
  }

  publish(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(...args));
    }
  }

  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

// 34. 单例模式
function singleton(fn) {
  let instance;
  return function (...args) {
    if (!instance) {
      instance = fn.apply(this, args);
    }
    return instance;
  };
}

// 或者使用类的方式
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }
}

// 35. 观察者模式
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log('Received update:', data);
  }
}

// 36. 简易版Vue响应式
function defineReactive(obj, key, val) {
  const dep = new Set();

  Object.defineProperty(obj, key, {
    get() {
      // 收集依赖
      if (activeEffect) {
        dep.add(activeEffect);
      }
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        // 触发依赖
        dep.forEach((effect) => effect());
      }
    },
  });
}

let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

// 37. 图片懒加载
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  images.forEach((img) => observer.observe(img));
}

// 38. 简易版Ajax
function ajax(options) {
  return new Promise((resolve, reject) => {
    const { method = 'GET', url, data, headers = {} } = options;
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.statusText));
        }
      }
    };
    xhr.onerror = function () {
      reject(new Error('Network Error'));
    };
    xhr.send(data ? JSON.stringify(data) : null);
  });
}

// 39. 格式化日期
function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

// 40. 生成UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 41. 判断是否是回文字符串
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// 42. 字符串反转
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 43. 首字母大写
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 44. 生成随机字符串
function randomString(length = 8) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 45. 解析Cookie
function parseCookie(cookieStr = document.cookie) {
  return cookieStr.split(';').reduce((acc, pair) => {
    const [key, value] = pair.trim().split('=');
    if (key) {
      acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
    return acc;
  }, {});
}

// 46. 设置Cookie
function setCookie(name, value, days = 7) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires=${date.toUTCString()}; path=/`;
}

// 47. 深比较
function deepEqual(a, b) {
  if (a === b) return true;
  if (
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a === null ||
    b === null
  ) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => deepEqual(a[key], b[key]));
}

// 48. 深合并对象
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// 49. 判断素数
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// 53. 最大公约数
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// 54. 最小公倍数
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// 55. 实现一个简单的模板引擎
function renderTemplate(template, data) {
  return template.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
    return get(data, path, '');
  });
}

// 56. 转义HTML
function escapeHtml(str) {
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => escapeMap[char]);
}

// 57. 反转义HTML
function unescapeHtml(str) {
  const unescapeMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  return str.replace(
    /&(?:amp|lt|gt|quot|#39);/g,
    (entity) => unescapeMap[entity]
  );
}

// 58. 实现Array.from
Array.myFrom = function (arrayLike, mapFn, thisArg) {
  const result = [];
  for (let i = 0; i < arrayLike.length; i++) {
    if (i in arrayLike) {
      const val = arrayLike[i];
      result.push(mapFn ? mapFn.call(thisArg, val, i) : val);
    }
  }
  return result;
};

// 59. 实现Array.of
Array.myOf = function (...items) {
  return items;
};

// 60. 实现Array.prototype.fill
Array.prototype.myFill = function (value, start = 0, end = this.length) {
  const arr = this;
  const len = arr.length;
  let s = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  let e = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
  for (let i = s; i < e; i++) {
    arr[i] = value;
  }
  return arr;
};

// 61. 实现Array.prototype.copyWithin
Array.prototype.myCopyWithin = function (target, start = 0, end = this.length) {
  const arr = this;
  const len = arr.length;
  const to = target < 0 ? Math.max(len + target, 0) : Math.min(target, len);
  const from = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  const last = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);
  const copy = arr.slice(from, last);
  for (let i = 0; i < copy.length && to + i < len; i++) {
    arr[to + i] = copy[i];
  }
  return arr;
};

// 62. 实现Array.prototype.entries
Array.prototype.myEntries = function () {
  const arr = this;
  let index = 0;
  return {
    next() {
      if (index < arr.length) {
        return { value: [index, arr[index++]], done: false };
      }
      return { value: undefined, done: true };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

// 63. 实现Array.prototype.keys
Array.prototype.myKeys = function () {
  const arr = this;
  let index = 0;
  return {
    next() {
      if (index < arr.length) {
        return { value: index++, done: false };
      }
      return { value: undefined, done: true };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

// 64. 实现Array.prototype.values
Array.prototype.myValues = function () {
  const arr = this;
  let index = 0;
  return {
    next() {
      if (index < arr.length) {
        return { value: arr[index++], done: false };
      }
      return { value: undefined, done: true };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
};

// 65. 实现Number.isFinite
Number.myIsFinite = function (value) {
  return typeof value === 'number' && isFinite(value);
};

// 66. 实现Number.isNaN
Number.myIsNaN = function (value) {
  return typeof value === 'number' && value !== value;
};

// 67. 实现Number.isInteger
Number.myIsInteger = function (value) {
  return (
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  );
};

// 68. 实现Object.entries
Object.myEntries = function (obj) {
  const result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push([key, obj[key]]);
    }
  }
  return result;
};

// 69. 实现Object.keys
Object.myKeys = function (obj) {
  const result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(key);
    }
  }
  return result;
};

// 70. 实现Object.values
Object.myValues = function (obj) {
  const result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(obj[key]);
    }
  }
  return result;
};

// 71. 实现Object.fromEntries
Object.myFromEntries = function (entries) {
  const result = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
};

// 72. 实现Object.prototype.hasOwnProperty
Object.prototype.myHasOwnProperty = function (prop) {
  return Object.prototype.hasOwnProperty.call(this, prop);
};

// 73. 实现String.prototype.includes
String.prototype.myIncludes = function (searchString, position = 0) {
  return this.indexOf(searchString, position) !== -1;
};

// 74. 实现String.prototype.startsWith
String.prototype.myStartsWith = function (searchString, position = 0) {
  const pos = position >= 0 ? position : 0;
  return this.slice(pos, pos + searchString.length) === searchString;
};

// 75. 实现String.prototype.endsWith
String.prototype.myEndsWith = function (searchString, position = this.length) {
  const pos = Math.min(position, this.length);
  return this.slice(pos - searchString.length, pos) === searchString;
};

// 76. 实现String.prototype.repeat
String.prototype.myRepeat = function (count) {
  if (count < 0 || count === Infinity) {
    throw new RangeError('Invalid count value');
  }
  let result = '';
  for (let i = 0; i < Math.floor(count); i++) {
    result += this;
  }
  return result;
};

// 77. 实现String.prototype.padStart
String.prototype.myPadStart = function (targetLength, padString = ' ') {
  const str = String(this);
  if (str.length >= targetLength) return str;
  const padLen = targetLength - str.length;
  const repeatCount = Math.ceil(padLen / padString.length);
  const padding = padString.repeat(repeatCount).slice(0, padLen);
  return padding + str;
};

// 78. 实现String.prototype.padEnd
String.prototype.myPadEnd = function (targetLength, padString = ' ') {
  const str = String(this);
  if (str.length >= targetLength) return str;
  const padLen = targetLength - str.length;
  const repeatCount = Math.ceil(padLen / padString.length);
  const padding = padString.repeat(repeatCount).slice(0, padLen);
  return str + padding;
};

// 79. 实现String.prototype.split
String.prototype.mySplit = function (separator, limit) {
  const result = [];
  const str = this;
  if (separator === undefined) {
    return [str];
  }
  if (separator === '') {
    return str.split('').slice(0, limit);
  }
  let index = 0;
  let nextIndex;
  while (
    (nextIndex = str.indexOf(separator, index)) !== -1 &&
    result.length < limit
  ) {
    result.push(str.slice(index, nextIndex));
    index = nextIndex + separator.length;
  }
  if (result.length < limit) {
    result.push(str.slice(index));
  }
  return result;
};

// 80. 实现JSON.stringify
function myJSONStringify(value, replacer, space) {
  const seen = new WeakSet();

  function stringify(val, key) {
    if (val === null) return 'null';
    if (val === undefined) return undefined;
    if (typeof val === 'function' || typeof val === 'symbol') return undefined;
    if (typeof val === 'string') return `"${val}"`;
    if (typeof val === 'number') return String(val);
    if (typeof val === 'boolean') return String(val);
    if (typeof val === 'bigint')
      throw new TypeError('BigInt value cannot be serialized');
    if (typeof val === 'object') {
      if (seen.has(val)) {
        throw new TypeError('Converting circular structure to JSON');
      }
      seen.add(val);

      if (val instanceof Date) {
        return `"${val.toISOString()}"`;
      }
      if (Array.isArray(val)) {
        const arr = val.map((item, i) => {
          const res = stringify(item, i);
          return res === undefined ? 'null' : res;
        });
        return `[${arr.join(',')}]`;
      }

      const obj = [];
      for (const k in val) {
        if (Object.prototype.hasOwnProperty.call(val, k)) {
          const res = stringify(val[k], k);
          if (res !== undefined) {
            obj.push(`"${k}":${res}`);
          }
        }
      }
      return `{${obj.join(',')}}`;
    }
  }

  return stringify(value);
}

// 81. 实现JSON.parse
function myJSONParse(str) {
  let index = 0;

  function parseValue() {
    skipWhitespace();
    const char = str[index];
    if (char === '{') return parseObject();
    if (char === '[') return parseArray();
    if (char === '"') return parseString();
    if (char === 't' || char === 'f') return parseBoolean();
    if (char === 'n') return parseNull();
    return parseNumber();
  }

  function skipWhitespace() {
    while (/\s/.test(str[index])) index++;
  }

  function parseObject() {
    index++;
    const obj = {};
    skipWhitespace();
    if (str[index] === '}') {
      index++;
      return obj;
    }
    while (true) {
      skipWhitespace();
      const key = parseString();
      skipWhitespace();
      index++;
      obj[key] = parseValue();
      skipWhitespace();
      if (str[index] === '}') {
        index++;
        break;
      }
      index++;
    }
    return obj;
  }

  function parseArray() {
    index++;
    const arr = [];
    skipWhitespace();
    if (str[index] === ']') {
      index++;
      return arr;
    }
    while (true) {
      arr.push(parseValue());
      skipWhitespace();
      if (str[index] === ']') {
        index++;
        break;
      }
      index++;
    }
    return arr;
  }

  function parseString() {
    index++;
    let result = '';
    while (str[index] !== '"') {
      if (str[index] === '\\') {
        index++;
        result += str[index];
      } else {
        result += str[index];
      }
      index++;
    }
    index++;
    return result;
  }

  function parseNumber() {
    const start = index;
    if (str[index] === '-') index++;
    while (/[0-9]/.test(str[index])) index++;
    if (str[index] === '.') {
      index++;
      while (/[0-9]/.test(str[index])) index++;
    }
    if (str[index] === 'e' || str[index] === 'E') {
      index++;
      if (str[index] === '+' || str[index] === '-') index++;
      while (/[0-9]/.test(str[index])) index++;
    }
    return Number(str.slice(start, index));
  }

  function parseBoolean() {
    if (str.slice(index, index + 4) === 'true') {
      index += 4;
      return true;
    }
    if (str.slice(index, index + 5) === 'false') {
      index += 5;
      return false;
    }
  }

  function parseNull() {
    if (str.slice(index, index + 4) === 'null') {
      index += 4;
      return null;
    }
  }

  return parseValue();
}

// 82. 实现Function.prototype.toString (获取函数源码)
Function.prototype.myToString = function () {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function');
  }
  return this.toString();
};

// 83. 判断是否是纯对象
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

// 84. 判断是否是空对象
function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

// 85. 实现类数组转数组
function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

// 或者
function toArray2(arrayLike) {
  return [...arrayLike];
}

// 86. 深拷贝 (完整版，支持Symbol和循环引用)
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 处理特殊对象
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Map) {
    const cloneMap = new Map();
    hash.set(obj, cloneMap);
    obj.forEach((value, key) => {
      cloneMap.set(deepClone(key, hash), deepClone(value, hash));
    });
    return cloneMap;
  }
  if (obj instanceof Set) {
    const cloneSet = new Set();
    hash.set(obj, cloneSet);
    obj.forEach((value) => {
      cloneSet.add(deepClone(value, hash));
    });
    return cloneSet;
  }
  if (obj instanceof Function) {
    return function (...args) {
      return obj.apply(this, args);
    };
  }

  // 处理ArrayBuffer
  if (obj instanceof ArrayBuffer) {
    return obj.slice(0);
  }

  // 处理TypedArray
  if (ArrayBuffer.isView(obj)) {
    return new obj.constructor(obj.buffer.slice(0), obj.byteOffset, obj.length);
  }

  // 处理普通对象和数组
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);

  // 处理Symbol属性
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for (const symKey of symbolKeys) {
    clone[symKey] = deepClone(obj[symKey], hash);
  }

  // 处理普通属性
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}

// 87. 实现一个事件委托
function delegate(element, eventType, selector, handler) {
  element.addEventListener(eventType, function (event) {
    const target = event.target;
    let current = target;
    while (current && current !== element) {
      if (current.matches(selector)) {
        handler.call(current, event);
        return;
      }
      current = current.parentNode;
    }
  });
}

// 88. 实现一个简单的模板字符串解析
function parseTemplateString(str, data) {
  return str.replace(/\$\{([^}]+)\}/g, (match, expression) => {
    try {
      return new Function('data', `with(data) { return ${expression} }`)(data);
    } catch (e) {
      return '';
    }
  });
}

// 89. 实现一个简单的路径匹配器 (类似路由)
function matchPath(pattern, path) {
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');
  const params = {};

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

// 90. 实现一个简单的状态机
class StateMachine {
  constructor(initialState, states) {
    this.currentState = initialState;
    this.states = states;
  }

  transition(action) {
    const currentStateConfig = this.states[this.currentState];
    const nextState = currentStateConfig?.transitions?.[action];
    if (nextState) {
      currentStateConfig.onExit?.(action);
      this.currentState = nextState;
      this.states[this.currentState].onEnter?.();
    }
    return this.currentState;
  }

  getState() {
    return this.currentState;
  }
}
