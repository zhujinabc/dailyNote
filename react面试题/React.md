# React 串讲

## 问题列表

1. Redux 是如何将 State 注入到 React 组件上去
2. Redux 在实际项目中的使用以及问题
3. React 中的 Hooks



## 学习目标

* [ ] 了解 Redux 与 React-Redux 之间的关系以及它们的基本原理
* [ ] 了解一些关于 Redux 的最佳实践以及异步问题解决方案
* [ ] 了解 React Hooks 的特性以及如何在实际项目中使用 React Hooks



## 问题详解

###1. Redux 是如何将 State 注入到 React 组件上去



#### 问题分析

- React：用于构建用户界面的 JavaScript 库（负责组件的 UI 界面渲染的库）
- Redux：JavaScript 状态容器（负责管理数据的工具）



-> 回顾一下 Redux 的用法



[**React-Redux**](https://www.redux.org.cn/)

扩展：[vuejs-redux](https://github.com/titouancreach/vuejs-redux) ,  [ng-redux](https://github.com/angular-redux/ng-redux)



> 结论：Redux 是一个独立的库，与 React 并没有直接关系，是 React-Redux 将它们俩联系起来的



**Redux 解决了什么问题？**

![](./assets/1.jpg)

> 结论： Redux 的出现其实就是解决了复杂应用的状态管理问题，可以**跨层级任意传递数据**。



#### 问题详解

**Redux 的原理**

Redux 就是一个经典的**发布订阅器**。

```js
Button.addEventListener('click', () => { ... })  // 订阅 -- 当触发 A 的时候 就执行 B
Button.removeEventListener('click', () => { ... }) // 取消订阅 - 当触发 A 的时候，不再执行 B
Button.onClick // 发布 -- 触发 A

```



Redux 核心源码

```js
/**
 * 
 * @param {Function} reducer   reducer
 * @param {any} preloadedState 初始化的 state，用的相对较少，一般在服务端渲染的时候使用
 * @param {Function} enhancer  中间件
 */
export default function createStore(reducer, preloadedState, enhancer) {
  // 实现第二个形参选填
  // 只有当第二参数传入的是中间件才会执行下面的代码
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  
  let currentReducer = reducer;
  let currentState = preloadedState; // 整个应用所有的 State 都存储在这个变量里
  let currentListeners = []; // 订阅传进来的的回调函数 <=>  Button.addEventListener('click', () => { ... })

  // 这是一个很重要的设计
  let nextListeners = currentListeners;
 
  function getState() {
    return currentState;
  }

  function subscribe(listener) {
  
    if (nextListeners === currentListeners) {
      // 浅复制
      // 实际上 nextListeners 就是 currentListeners，避免直接操作 currentListeners，因为
      // 其他地方会用到 currentListeners，从而造成数据不一致。
      nextListeners = [...currentListeners];
    }
    nextListeners.push(listener);
		
    return function unsubscribe() {
       if (nextListeners === currentListeners) {
        // 浅复制
        nextListeners = [...currentListeners];
      }

      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    }
  }
// Button.addEventListener('click', () => { ... })
// Button.removeEventListener('click', () => { ... })

  function dispatch(action) {
    currentState = currentReducer(currentState, action); // 调用 reducer 来更新数据
   
    const listeners = (currentListeners = nextListeners); // 保证当前的 listeners 是最新的
    
    for (let i = 0; i < listeners.length; i++) {
      listeners[i](); // 依次执行回调函数
    }

    return action;
  }

  // 手动触发一次 dispatch，初始化
  dispatch({type: 'INIT'});

  return {
    getState,
    dispatch,
    subscribe,
  }
}
```

> 总结：**Redux 就是帮我们用一个变量存储所有的 State，并且提供了发布功能来修改数据，以及订阅功能来触发回调（但是回调之后干嘛？自己解决）。**



**React-Redux 做了什么事情?**

![2](./assets/2.png)



Provider 核心源码

```javascript
import React from 'react'
import PropTypes from 'prop-types'

export default class Provider extends React.Component {
  // context 往所有子组件，孙组件里传递数据
  // props   父组件往子组件里传递数据
  // state   组件自身的数据
  
  // 声明一个 context 数据
  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
}
```

> 总结：**Provider 就是通过 React 的 Context API 把数据往下传 。**



connect 核心源码

```javascript
import React from 'react'
import PropTypes from 'prop-types'

// connect() => () => {} 函数的柯里化
// const sum = (a) => { return (b) => a + b }
// sum(1)(2) -> connect(mapStateToProps, mapDispatchToProps)(Comp)

// HOC 高阶组件
const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
  
    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {} // 声明了一个叫做 props 的 state
      }
    }
  
    componentDidMount() {
      const { store } = this.context  // 从 Context 中拿到 store 对象
      store.subscribe(() => this.update()) // 订阅 Redux 的数据更新
      this.update()
    }
  
    // 每次数据有更新的时候，就会调用这个方法
    update() {
      const { store } = this.context // 从 Context 中拿到 store 对象
      const stateProps = mapStateToProps(store.getState()) // 把 store 中的全部数据传到组件内部
      const dispatchProps = mapDispatchToProps(store.dispatch)//把 store.dispatch 传到组件内部
      
      // 调用 setState 触发组件更新
      // 将最新的 state 以及 dispatch 合并到当前组件的 props 上
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }
  
    render() {
      // 传入 props
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

export default connect;

// const mapStateToProps = state => { Tips：这里注入进来的
//   return {
//     value: state,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onIncrement: () => dispatch({ type: 'INCREMENT' }),
//     onDecrement: () => dispatch({ type: 'DECREMENT' }),
//   }
// }
```

> 总结：**connect 就是一个高阶组件，接收 Provider 传递过来的 store 对象，并订阅 store 中的数据，如果 store 中的数据发生改变，就调用 setState 触发组件更新。**



#### 答题思路

1. 首先明确与 React 产生关联的是 React-Redux 这个库
2. Redux 的原理就是一个**发布订阅器**，帮我们用一个变量存储所有的 State，并且提供了发布功能来修改数据，以及订阅功能来触发回调 + 50
3. 而 React-Redux 的作用就是订阅 Store 里数据的更新，他包含两个重要元素，Provider 和 connect 方法 +10
4. **Provider 的作用就是通过  Context API 把 Store  对象注入到 React 组件上去** +20
5. 而 connect 方法就是一个高阶组件，在高阶组件里通过订阅 Store 中数据的更新，从而通过调用 setState 方法来触发组件更新 +20



###2. Redux 在实际项目中的使用以及问题

#### 问题分析

这个问题偏实践，比较开放，可以从以下三个方面考虑：

1. 为什么要使用 Redux
2. 如果一定是使用，有哪些最佳实践
3. Redux 的异步问题怎么处理



####问题详解

**先考虑需不需要使用 Redux？**

Redux 的作者写过一篇文章 [也许你可以不必使用 Redux](https://zhuanlan.zhihu.com/p/22597353)

- 如果你不知道是否需要 Redux，那就是不需要它

- 只有遇到 React 实在解决不了的问题，你才需要 Redux

> 结论：**如果你的 UI 层非常简单，没有很多交互，Redux 就是不必要的，用了反而增加复杂性（reducer, action => this.setState() ）。**



**如果一定要使用 Redux, 可以有哪些最佳实践？**

模拟面试对话：

Q: 面试官爸爸    A: 你



Q: 小伙子，我问你，你觉得你们的项目使用 Redux，吐槽最多的地方是什么？

->

问题分析

​	先思考使用 Redux 的痛点是什么？

​    修改一次数据，太麻烦，dispatch(action) -> 调用 reducer 计算 -> 触发回调 -> 更新数据

->

A: Redux 在项目中使用，最大的弊端就是样板代码（action, reducer）太多了，修改数据的链路太长。

->

Q: 那为什么你还要使用 Redux 呢？

->

A: 因为 Redux 可以解决跨组件间数据传递的问题，并且修改数据很清晰。

->

Q: nice，那你在使用 Redux 有哪些比较好的实践方式呢？

->

问题分析

​	从痛点出发，想办法解决 Redux 的痛点。

​	可以通过一些手段减少模板代码，从而简化 Redux API

1. 使用 [redux-actions](https://github.com/redux-utilities/redux-actions) ，在初始化 reducer 和 action 构造器时减少样板代码 -> 看看这么使用
   - 减少创建 action 时写一堆固定的方法
     - () => ({ type: 'XXX' })   ->    createAction('XXX', payload => payload)
   - 减少创建 reducer 时写一堆固定的 switch
     - switch{}   ->   handleActions({})
2. 使用 [cli 工具](https://github.com/facebook/create-react-app)，帮我们自动生成模板代码
   - 使用 [yeoman](https://yeoman.io/) 来帮我们用命令一键创建样板文件和样本代码（详细可参见在职加薪课）

->

A:  可以通过一些手段减少模板，从而简化 Redux API，比如引入 Redux-Actions 来减少抒写固定不变的代码，以及使用 yeoman 来用命令自动生成样板文件以及代码。



> 总结：
>
> Redux 最大的弊端是样板代码太多，修改数据的链路太长。
>
> 解决方案：可借助一些工具，帮我们减少创建样板代码的过程
>
> - 使用 Redux-Actions 来减少抒写固定不变的代码，让我们的 actions 和 reduces 更清晰
> - 同时还可以使用 yeoman 等 cli 工具，帮我们用命令一键创建样板文件和样本代码





**Redux 的异步问题怎么处理？**

真实业务开发我们需要处理异步请求，比如：请求后台数据，延迟执行某个效果，setTimout, setInterval 等等，所以当 Redux 遇到异步操作的时候，该如何处理?



模拟面试对话：

Q: 为什么 Redux 处理不了异步问题？

->

问题分析

​	从 Redux 代码的原理出发

```javascript
dispatch(action) // action = { type: 'XXX', payload: 'xxx' };

// ->reducer 是一个纯函数，无法处理其他类型的数据

// 所以 dispatch 默认接收的 action 不可以是其他类型的
dispatch((dispatch) => {
  setTimeout(() => {
    dispatch({ type: 'INCREMENT'})
  }, 3000);
});
```



A: dispatch 默认只能接收一个 Object 类型的 action，因为 reducer 里面要接收 action.type 来处理不同的数据。

->

Q: very nice，那怎么解决？

->

问题分析：

​	找度娘，Redux 异步问题可以通过中间件来解决

1. 使用 [Redux-thunk](https://github.com/reduxjs/redux-thunk) 中间件，来解决异步 Action 的问题

 	2. 使用 [Redux-saga](https://redux-saga-in-chinese.js.org/) 中间件，让异步行为成为架构中独立的一层(称为 saga)（详细可参见中级程序员课程）



> 总结：
>
> Redux 默认 的 dispatch 只能接收一个 Object 类型的 action，如果要让 Redux 支持异步操作，可以通过引入 Redux-thunk 或者 Redux-saga 等其他的中间件来使 Redux 支持异步 Action。



####答题思路

1. Redux 会额外增加代码的复杂性，使用前需要考虑当前项目的规模和需求 30
2. 可以使用 Redux-Actions 来帮我们减少抒写固定不变的代码，并且使用 cli 工具来帮我们自动创建样板代码 30 
3. Redux 默认无法处理异步 Action 是因为 dispatch 只能接收一个 Object 类型的 Action。但是可以通过引入中间件的方式来解决 40

 

###3. React 中的 Hooks

####题目分析

**回顾一下组件类型**

函数组件：

1.  一个函数就是一个组件
2.  一个函数组件必须有 return
3.  return 的是一个 React 元素

```react
function Welcome (props) {
  return <h1>Welcome {props.name}</h1>
}
```



类组件：

1. 一个 Class 就是一个类组件
2. 所有类组件都是继承于 React.Component
3. React.Component 类有自带的属性和方法, 比如 render，componentDidMount 等其他生命周期

```react
class Welcome extends React.Component {
  render() {
    return (
      <h1>Welcome { this.props.name }</h1>
    );
  }
}
```



**函数组件 vs 类组件**

| 区别             | 函数组件(无状态组件) | 类组件 |
| ---------------- | -------------------- | ------ |
| 是否有 this      | 没有                 | 有     |
| 是否有生命周期   | 没有                 | 有     |
| 是否有状态 state | 没有                 | 有     |



**Hooks 的作用，以及有哪些特性？**

React Hooks 是 v16.8 版本引入了全新的 API，它算是一个**颠覆性**的变革。

- 所有的 React 组件都可以是一个函数组件，再也不需要写类组件了
- 再也不需要记住 React 有哪些生命周期函数了



####问题详解

**先从写法上来对比**

Class 版本

```react
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    // 改变 title
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```



React Hooks 版本

```react
import { useState, useEffect } from 'react'; //v16.8

function Example() {
  const [count, setCount] = useState(0); // 类似于 this.state = { count: 0 }
  const [loading, setLoading] = useState(false); // this.state = {loading: false}
	// 声明的名称叫做 xxx, 那么必定有一个值叫做 setXxx() (固定的写法)
  
  // 类似于 componentDidMount 和 componentDidUpdate;
  useEffect(() => {
    // 改变 title
    document.title = `You clicked ${count} times`;
  });
  
    useEffect(() => {
    // 发送 ajax 请求
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

> 结论：**React Hooks 可以让我们的代码变得更加简洁，结构更清晰**



**在实际项目中如何使用 Hooks？**

比如有一个需求，我们需要在页面 A 和 页面 B 上请求一部电影的详细数据。

传统做法：

A -> 加载 -> 发送请求 `https://swapi.co/api/films/1`

B -> 加载 -> 发送请求 `https://swapi.co/api/films/2`



普通的写法

```react
class App extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      loading: false, // 请求的菊花状态
      data: {},       // 电影的详细数据
    };
  }  

  componentDidMount() {
    this.setState({  // 1. 设置 loading 为 true
      loading: true,
    })
    
    fetch(`https://swapi.co/api/films/${this.props.filmId}`)  // 2. 发送请求
      .then(data => {
        this.setState({
          data: data, // 3. 收到请求后，设置 data 为请求到的数据
          loading: false, // 4. 设置 loading 为 false
        })
      });
  }
  
  componentDidUpdate() {
     this.fethData(this.props.filmId);
  }
  
  // 无法抽离出去，
  fetchData = (filmId) => {
    this.setState({  // 1. 设置 loading 为 true
      loading: true,
    })
    
    fetch(`https://swapi.co/api/films/${filmId}`)  // 2. 发送请求
      .then(data => {
        this.setState({
          data: data, // 3. 收到请求后，设置 data 为请求到的数据
          loading: false, // 4. 设置 loading 为 false
        })
      });
  }
  
  render() {
    const { loading, data } = this.state;
    if (loading === true) {
      return <p>Loading ...</p>;
    }
    return (
      <div>
        <p>电影名称: {data.title}</p>
        <p>导演: {data.producer}</p>
        <p>发布日期: {data.release_date}</p>
      </div>
    );
  }
}
```





解决问题的心路历程：

抽离相同的代码部分（发送请求的过程）

->

抽离出去的代码返回什么（页面里要用到的是什么数据）

->

loading 和 data

->

创建自定义 Hooks

```javascript
// 注意 hooks 约定必须以 use 开头(useA, useB)
const useFetchData = (filmId) => {
  const [loading, setLoading] = useState(false); // 只有在第一次加载的时候才会 被 false 复制
  const [data, setData] = useState({});
  
  useEffect(() => {
    setLoading(true); // 1. 设置 loading 为 true
    fetch(`https://swapi.co/api/films/${filmId}`) // 2. 发送请求
      .then(data => {
        setData(data); // 3. 收到请求后，设置 data 为请求到的数据
        setLoading(false); // 4. 设置 loading 为 false
      });
  }, [filmId]); // filmId 变化的时候，才触发 useEffect

  return loading, data];
};
```



使用自定义 Hooks

```react
import useFetchData from './useFetchData';

function App({ filmId }) {
  const [loading, data] = useFetchData(filmId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>电影名称: {data.title}</p>
      <p>导演: {data.producer}</p>
      <p>发布日期: {data.release_date}</p>
    </div>
  );
}
```



扩展：[社区共享了很多已经实现好的常用业务 Hooks](https://github.com/gragland/usehooks)



#### 答题思路

1. React Hooks 是一个新的 API，可以用函数来写所有的组件
2. 可以让函数组件也可以拥有自己的状态管理（包括 state 和生命周期函数）
3. 可以通过创建自定义的 Hooks 来抽离可复用的业务组件




