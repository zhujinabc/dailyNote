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
//数组乱序
function shuffle(arr){
    let len = arr.length
    while(len > 1){
        let index = parseInt(Math.random() * m--);
        [arr[index],arr[m]] = [arr[m],arr[index]];
    }
    return arr 
}
//数组去重

Array.from(new Set(arr))//方法1
[... new Set(arr)]//方法2
function rmoveDup(arr){//方法3，建议面试的时候用reduce，装逼用
    return arr.reduce((pre,cur)=>{
        if(!pre.includes(cur)){
            return pre.concat(cur)
        }else{
            return pre
        }
    },[])
}
function removeDup(arr){//方法3
    var result = []
    var hashMap = {}
    for(let i = 0; i< arr.length - 1;i++){
        var temp = arr[i]
        if(!hashMap[temp]){
            result.push(arr[i])
            hashMap[temp] = true
        }
    }
    return result;
}

//实现数组的flat方法
function flatten(arr){//铺开一层的flat
    let result = []
    for(let i = 0;i< arr.length; i++){
        if(Array.isArray(arr[i])){
            result = result.concat(flatten(arr[i]))
        }else{
            result.push(arr[i])
        }
    }
}
function flattenByDeep(arr,deep){//展开多层的
    let result = []
    for(let i = 0; i<arr.lenght; i++){
        if(Array.isArray(arr[i]) && deep >=1){
            result = result.concat(flattenByDeep(arr[i],deep - 1))
        }else{
            result.push(arr[i])
        }
    }
}

//实现数组的fillter方法
Array.prototype.filter = function(fn,context){
    if(typeof fn != 'function'){
        throw new TypeError(`${fn} is not a function`)
    }
    let arr = this;
    let reuslt = []
    for(var i = 0;i < arr.length; i++){
        let temp= fn.call(context,arr[i],i,arr);
        if(temp){
            result.push(arr[i]);
        }
    }
    return result
}

//实现call,apply,bind函数
Function.prototype.myCall = function(context){ 
    if(typeof this != 'function'){
        throw new TypeError('this is not a function')
    }
    context.fn = this;
    var arr = [];
    for(var i = 1; i< arguments.length; i++){
        arr.push('argument[' + i + ']')
    }
    var result = eval('context.fn(' +arr+ ')');
    delete context.fn;
    return result;
}
Function.prototype.myApply = function(context,arr){ 
    if(typeof this != 'function'){
        throw new TypeError('this is not a function')
    }
    context.fn = this;
    var result= [];
    if(!arr){
        result = context.fn()
    }else{
        var args = [];
        for(var i = 1; i< arr.length; i++){
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' +args+ ')');
    }
    delete context.fn;
    return result;
}
Function.prototype.myBind = function(context){
    if(typeof this != 'function'){
        throw new TypeError('this is not a function')
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments,1);
    var F = function(){};
    F.prototype = this.prototype;
    var bound = function(){
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof F ? this: context, args.concat(bindArgs))
    };
    bound.prototype = new F();
    return bound;
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
    let proto = left.__proto__;
    let protoType = right.prototype
    while(true){
        if(proto === null){
            return false
        }
        if(proto === protoType){
            return true
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
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, time*1000);
    });
}
//实现promise.all
//实现promise.retry
//将一个同步回调封装成一个promise
function promisify(fn,context){
    return (...args) => {
      return new Promise((resolve,reject) => {
          fn.apply(context,[...args,(err,res) => {
              return err ? reject(err) : resolve(res)
          }])
      })
    }
  }

