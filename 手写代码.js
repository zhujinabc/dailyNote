//快排
function quickSort (arr,r,l){
    let middle = arr.lenght/2
    let left = l
    let right = r
    while(left < right){
        //首先查找出middle左边和右边的需要呼唤的元素
        while(arr[left]<arr[middle]){
            left ++
        }
        while(arr[right]>arr[middle]){
            right --
        }
        if(right<=left){
            break
        }
        arr[right] = arr[right] + arr[left]
        arr[left] = arr[right] - arr[left]
        arr[right] = arr[right] - arr[left]
    }
    if(left < r){
        quickSort(arr, left, r)
    }
    if(right > l){
        quickSort(arr, l, right)
    }
}
function quickSort(arr,left,right){
    let r = right
    let l = left
    let mid = Math.parseInt((r+l)/2)
    while(l<r){
        while(arr[l]<arr[mid]){
            l ++
        }
        while(arr[r]>arr[mid]){
            r --
        }
        let temp = arr[r]
        arr[r] = arr[l]
        arr[l] = temp
        if(right<=left){
            break
        }
    }
    if(r>left){
        quickSort(arr,left,r)
    }
    if(l<right){
        quickSort(arr,l,right)
    }
}
//深拷贝
function deepClone(obj){
    let cloneObj = new obj.constructor()
    if(obj === null) return obj
    if(obj instanceof RegExp) return new RegExp(obj)
    if(obj instanceof Date) return new Date(obj)
    if(typeof obj !== 'object') return obj
    for(let i in obj){
        cloneObj[i] = deepClone(obj[i])
    }
    return cloneObj
}

function deepClone(obj){
    let cloneObj = new obj.constructor()
    if(obj === null || typeof obj !== obj) return obj
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    for(let key in obj){
        cloneObj[key] = deepClone(obj[key])
    }
    return cloneObj
}
//防抖
function debounce(fn,delay){
    let timer
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(function(){
            fn.apply(this,arguments)
        },delay)
    }
}
function debounce(fn,delay){
    let timer
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(this,arguments)
        },delay)
    }
}
//节流
function throttle(fn,delay){
    let timer
    return function(){
        if(!timer){
            timer = setTimeout(function(){
                fn.apply(this,arguments)
                timer = null
            },delay)
        }
    }
}
function throttle(fn,delay){
    let timer
    return function(){
        if(!timer){
            setTimeout(()=>{
                fn.apply(this,arguments)
            },delay)
        }
    }
}
//数组乱序
function shuffle(arr){
    let len = arr.length
    while(len>1){
        let index = parseInt(Math.random().len--)//定义一个随机index
        [arr[index],arr[len]] = [arr[len],arr[index]]//将当前index和len下标的元素互换
    }
    return arr
}
//数组去重
Array.from(new Set(arr))
[...new Set(arr)]
function removeDup(arr){
    return arr.reduce((pre,cur)=>{
        if(!pre.includes(cur))
        {
            return pre.concat(cur)
        }else{
            return pre
        }
    },[])
}
function removeDup(arr){
    let map = new Map()
    let result = []
    for(let i = 0;i<arr.length;i++){
        if(!map[arr[i]]){
            result.push(arr[i])
            map.set(arr[i],true)
        }
    }
    return result
}

//实现数组的flat方法
function flatten(arr,deep){
    return arr.reduce((pre,cur)=>{
        return pre.concat(Array.isArray(cur) && deep >=1 ? flatten(cur,deep-1) : cur)
    },[])
}
//实现数组map方法
Array.prototype.map = function(fn){
    if(typeof fn !== 'function'){
        throw new Error(`${fn} is not a function`)
    }
    let arr = this
    let result = []
    for(let i =0;i<arr.length;i++){
        result.push(fn.call(null,arr[i],i,arr))
    }
    return result
}
//实现数组的fillter方法
Array.prototype.filter = function(fn){
    if(typeof fn !== 'function'){
        throw new Error(`${fn} is not a function`)
    }
    let arr = this
    let result = []
    for(let i=0;i < arr.length; i++){
        let temp = fn.call(null, arr[i],i,arr)
        if(temp){
            result.push(arr[i])
        }
    }
    return result
}

//实现call,apply,bind函数
Function.prototype.myCall = function(context){ 
    if(typeof this !== 'function'){
        throw new Error('this is not a function')
    }
    let context = context || window
    context.fn = this
    args = [...arguments].slice(1)
    let result = context.fn(...args)
    delete context.fn
    return result
}
Function.prototype.myApply = function(context){ 
    if(typeof this !== 'function'){
        throw new Error('this is not a function')
    }
    let context = context || window
    let result
    context.fn = this
    if(arguments[1]){
        result = context.fn(...arguments[1])
    }else{
        result = context.fn()
    }
    delete context.fn
    return result
}
Function.prototype.myBind = function(context){
    if(typeof this !== 'function'){
        throw new Error('this is not a funtion')
    }
    let _this = this
    let args = [...arguments].slice(1)
    return function F(){
        if(this instanceof F){// 因为返回了⼀个函数，我们可以 new F()，所以需要判断
            return new _this(...args,...arguments)
        }
        return _this.call(context,...args,...arguments)
    }
}

//实现继承
// ES5
function Parent(name,age){
    this.name = name;
    this.age = age;
}
Parent.prototype.say = function(){
    console.log('I am' + this.name)
}

function Child(name, age, sex){
    Parent.call(this,name,age);
    this.sex = sex;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
// ES6
class Parent {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
}

class Child extends Parents{
    constructor(name,age,sex){
        super(name,age);
        this.sex = sex; // 必须先调用super，才能使用this
    }
}

//实现EventEmitter
class EventEmitter {
    constructor(){
        this.events = {}
    }
    on(name,cb){
        if(!this.events[name]){
            this.events[name] = [cb];
        }else{
            this.events[name].push(cb)
        }
    }
    emit(name,...arg){
        if(this.events[name]){
            this.events[name].forEach(fn => {
                fn.call(this,...arg)
            })
        }
    }
    off(name,cb){
        if(this.events[name]){
            this.events[name] = this.events[name].filter(fn => {
                return fn != cb
            })
        }
    }
    once(name,fn){
        var onlyOnce = () => {
            fn.apply(this,arguments);
            this.off(name,onlyOnce)
        }
        this.on(name,onlyOnce);
        return this;
    }
}

//实现instanceof
function myInstanceof(left,right){
    let proto = left.__proto__;//左边是实例因此是__proto__
    let protoType = right.prototype//右边是构造函数因此是prototyp
    while(true){
        if(proto === protoType){
            return true
        }
        if(proto === null){
            return false
        }
        proto = proto.__proto__
    }
}
//new一个对象的过程
// 当我们new一个对象的时候，具体执行的是什么？MDN上给的说明如下：
// 创建一个空的简单 JavaScript 对象（即{}）；
// 链接该对象（即设置该对象的构造函数）到另一个对象 ；
// 将步骤1新创建的对象作为 this 的上下文 ；
// 如果该函数没有返回对象，则返回 this。
function newParent(){
    var obj = {}; // 首先创建一个对象
    obj.__proto__ = Parent.prototype; // 然后将该对象的__proto__属性指向构造函数的protoType
    var result = Parent.call(obj) // 执行构造函数的方法，将obj作为this传入
    return typeof(result) == 'object' ?  result : obj
}

function newParent(){
    let obj = {}
    obj.__proto__ = Parent.prototype
    var result = Parent.call(obj)
    return typeof result === 'object' ? result : obj
}
//实现jsonp
function jsonp(obj) {
    const {url,data} = obj;
    if (!url) return
    return new Promise((resolve, reject) => {
        const cbFn = `jsonp_${Date.now()}` 
        data.callback = cbFn
        const head = document.querySelector('head')
        const script = document.createElement('script')
        const src = `${url}?${data2Url(data)}`
        console.log('scr',src)
        script.src = src
        head.appendChild(script)
        
        window[cbFn] = function(res) {
            res ? resolve(res) : reject('error')
            head.removeChild(script)
            window[cbFn] = null 
        }
    })
}

function data2Url(data) {
    return Object.keys(data).reduce((acc, cur) => {
        acc.push(`${cur}=${data[cur]}`)
        return acc
    }, []).join('&')
}

//实现一个sleep函数
function sleep(delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{resolve(true)},delay*1000)
    })
}
//实现promise.all
Promise.all = function(promiseArr){
    if(promiseArr[Symbol.iterator] === undefined){
        throw new Error('promiseArr must be iteratorable')
    }
    return new Promise((resolve,reject)=>{
        let result = []//定义一个空数组接受结果
        let count = 0//定义一个count表示当前执行的数量
        promiseArr.forEach((item,index)=>{
            Promise.resolve(item).then((val)=>{
                result[index] = val
                count++
                if(count === promiseArr.length){
                    resolve(result)
                }
            },(err)=>{
                reject(err)
            })
        })
    })
}
//实现promise.allSettled
Promise.allSettled = function(promiseArr){
    if(promiseArr[Symbol.iterator] === undefined){
        throw new Error('promiseArr must be iteratorable')
    }
    return new Promise((resolve,reject)=>{
        let result = []
        let count = 0
        promiseArr.forEach((item,index)=>{
            Promise.resolve(item).then((val)=>{
                count++
                result[index] = val
                if(count === promiseArr.length){
                    resolve(result)
                }
            },(err)=>{
                count++
                result[index] = err
                if(count === promiseArr.length){
                    resolve(result)
                }
            })
        })
    })
}
//实现Promise.race
Promise.race = function(promiseArr){
    if(promiseArr[Symbol.iterator] === undefined){
        throw new Error('promiseArr must be iteratorable')
    }
    return new Promise((resolve,reject)=>{
        promiseArr.forEach((item,index)=>{
            Promise.resolve(item).then((val)=>{
                resolve(val)
            },(err)=>{
                reject(err)
            })
        })
    })
}
//实现promise.retry
Promise.retry = function(promise,times,delay){
    return new Promise((resolve,reject)=>{
        let action = function(){//定义一个函数执行穿进来的promise，如果失败就继续重试该函数，直到没有次数
            Promise.resolve(promise).then((val)=>{
                resolve(val)
            },(err)=>{
                if(times === 0){
                    reject(err)
                }else{
                    times--
                    setTimeout(()=>{
                        action()
                    },delay)
                }
            })
        }
        action()
    })
}
//将一个同步回调封装成一个promise
functiom promisify(fn){
    return (...args)=>{//该函数返回的应该是一个函数，而该返回的函数返回的是一个promise
        return new Promise((resolve,reject)=>{
            fn.apply(this,[...args,(err,res) => {
                return err ? reject(err) : resolve(res)
            }])
        })
    }
}
//实现函数柯里化
const curry = (fn, ...args1) => (...args2) => (
    arg => arg.length === fn.length ? fn(...arg) : curry(fn, ...arg)
   )([...args1, ...args2]);

function curry(fn, args) {
    var length = fn.length;
    var args = args || [];
    return function(){
        newArgs = args.concat(...arguments);
        if (newArgs.length < length) {
            return curry.call(this,fn,newArgs);
        }else{
            return fn.apply(this,newArgs);
        }
    }
}
   // 调用
   const foo = (a, b, c) => a * b * c;
   curry(foo)(2, 3, 4); // -> 24
   curry(foo, 2)(3, 4); // -> 24
   curry(foo, 2, 3)(4); // -> 24
   curry(foo, 2, 3, 4)(); // -> 24
//实现一个并发请求控制函数，限制并发数
function createRequest(tasks=[],pool){
    pool = pool || 5; //限制并发的数量
    let results = [];
    let running = 0; // 当前运行个数
    let resultsLength = tasks.length; // 用来判断最后的是否全部成功
    return new Promise((resolve,reject)=>{
        run();
        function run(){
            while(running < pool && tasks.length){ // 这个wile循环保证 一直有pool个请求在进行
            running++;
            let task = tasks.shift();
            task().then(result => {
                results.push(result);
            }).finally(()=>{
                running--;
                run();
            })
            }
            if(results.length === resultsLength) { // 全部执行结束
                resolve(results);
            }
        }
    })}

//实现一个函数add(3)(4)(5)(6)(7)(8);
var add = function (m) {
 
    var temp = function (n) {
        return add(m + n);
    }
 
    temp.toString = function () {
        return m;
    }
 
    return temp;
};
//但代码量极其少而精，重点技术在于：作用域、交替、匿名函数、toString的巧妙。
// 执行temp(5)，这个函数内执行add(m+n)，n是此次传进来的数值5，m值还是上一步中的7，
// 所以add(m+n)=add(7+5)=add(12)，此时m=12，并且返回temp函数
// 4、关键性一步来了，后面没有传入参数，等于返回的temp函数不被执行而是打印，
// 了解JS的朋友都知道对象的toString是修改对象转换字符串的方法，
// 因此代码中temp函数的toString函数return m值，而m值是最后一步执行函数时的值m=12，所以返回值是12。

//手写一个compose函数
function compose(...fns){
    return x =>{
        return fns.reduceRight((arg,fn) =>{
            return fn(arg);
        },x)
    }
}
// compose(f,g)(x) === f(g(x))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m)(x) === f(g(m(x)))
// compose(f,g,m,n)(x) === f(g(m(n(x))))

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
str.replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
    return s+','
})

//实现堆排序
// 交换两个节点
function swap(A, i, j) {
    let temp = A[i];
    A[i] = A[j];
    A[j] = temp; 
  }
  function shiftDown(A, i, length) {
    let temp = A[i]; // 当前父节点// j<length 的目的是对结点 i 以下的结点全部做顺序调整
    for(let j = 2*i+1; j<length; j = 2*j+1) {
      temp = A[i];  // 将 A[i] 取出，整个过程相当于找到 A[i] 应处于的位置
      if(j+1 < length && A[j] < A[j+1]) { 
        j++;   // 找到两个孩子中较大的一个，再与父节点比较
      }
      if(temp < A[j]) {
        swap(A, i, j) // 如果父节点小于子节点:交换；否则跳出
        i = j;  // 交换后，temp 的下标变为 j
      } else {
        break;
      }
    }
  }// 堆排序
  function heapSort(A) {// 初始化大顶堆，从第一个非叶子结点开始
    for(let i = Math.floor(A.length/2-1); i>=0; i--) {
      shiftDown(A, i, A.length);
    }// 排序，每一次for循环找出一个当前最大值，数组长度减一
    for(let i = Math.floor(A.length-1); i>0; i--) {
      swap(A, 0, i); // 根节点与最后一个节点交换
      shiftDown(A, 0, i);} // 从根节点开始调整，并且最后一个结点已经为当
    }                         // 前最大值，不需要再参与比较，所以第三个参数
                           // 为 i，即比较到最后一个结点前一个即可

//如何解决0.1+0.2不等于0.3的问题
//可以转为整数求解
function aa (num1, num2){
    const len1 = (num1.toString().split('.')[1] || '').length
    const len2 = (num2.toString().split('.')[1] || '').length
    const baseNum = Math.pow(10, Math.max(len1, len2))
    return (num1*baseNum + num2*baseNum)/baseNum
}
  
//实现模板语法
function render(template, data){
    const reg = /\{\{(\w+)\}\}/ //模板字符串正则
    if(reg.test(template)){ //判断模板里是否还有模板字符串
        const name = reg.exec(template)[1] // 查找当前模板里第一个模板字符串字段
        template = template.replace(reg, data[name]) // 将第一个模板字符串渲染
        return render(template, data)
    }
    return template
}

//实现解析csv的函数

//实现LRU缓存
//利用map的性质进行存储
/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
    this.map = new Map();
    this.capacity = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(this.map.has(key)){
        let value = this.map.get(key);
        this.map.delete(key); // 删除后，再 set ，相当于更新到 map 最后一位
        this.map.set(key, value);
        return value
    } else {
        return -1
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    // 如果已有，那就要更新，即要先删了再进行后面的 set
    if(this.map.has(key)){
        this.map.delete(key);
    }
    this.map.set(key, value);
    // put 后判断是否超载
    if(this.map.size > this.capacity){
        this.map.delete(this.map.keys().next().value);
    }

};

//实现虚拟dom到真实dom的转变

class Element{
    constructor(tagName, props, children){
        this.tagName = tagName,
        this.props = props
        this.children = children
    }
    render(){
        let el = document.createElement(this.tagName)
        let props = this.props
        for(let propsName of props){
            el.setAttribute(propsName, props[propsName])
        }
        let children = this.children || []
        children.forEach(item => {
            let childEl
            if(item instanceof Element){
                childEl = this.render(item)
            }else{
                childEl = document.createTextNode(item)
            }
            el.appendChild(childEl)
        })
        return el
    }
}

// 实现一个Task类，实现链式调用，log打印，wait等待n秒后执行
// Const task = new Task();
// Task.log(1)
// .log(2)
// .wait(3)
// .log(4)
// .wait(2)
// .log(6)
//todo
class Task {
    constructor(name){
        this.tasks = []
        this.tasks.push(()=>{
            console.log(name)
            this.next()
        })
        setTimeout(()=>{
            this.next()
        },0)
    }
    firstSleep(timer){
        console.log('first sleep')
        this.tasks.unshift(()=>{
            setTimeout(()=>{
                console.log('first sleep')
                this.next()
            },timer * 1000)
        })
        return this
    }
    sleep(timer){
        console.log('sleep')
        this.tasks.push(()=>{
            setTimeout(()=>{
                console.log('sleep')
                this.next()
            },timer * 1000)
        })
        return this
    }
    eat(){
        this.tasks.push(()=>{
            console.log('dinner')
            this.next()
        })
        return this
    }
    next(){
        let fn = this.tasks.shift()//每次从队头取出任务执行
        fn && fn()
    }

}