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
Promise.prototype.all = function(promiseArr){
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
Promise.prototype.allSettled = function(promiseArr){
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
Promise.prototype.race = function(promiseArr){
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
Promise.prototype.retry = function(promise,times,delay){
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