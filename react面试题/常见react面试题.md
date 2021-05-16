# react常见面试题

## 一.虚拟dom

而`React`会先将你的代码转换成一个`JavaScript`对象，然后这个`JavaScript`对象再转换成真实`DOM`。这个`JavaScript`对象就是所谓的虚拟`DOM`。

**虚拟dom有两种写法一种是jsx一种是React.createElement**

实际上，上面两种写法是等价的，`JSX`只是为 `React.createElement(component, props, ...children)`方法提供的语法糖。也就是说所有的`JSX`代码最后都会转换成`React.createElement(...)`，`Babel`帮助我们完成了这个转换的过程。

比如下面一段`html`代码：

```html
<div class="title">
      <span>Hello ConardLi</span>
      <ul>
        <li>苹果</li>
        <li>橘子</li>
      </ul>
</div>
```

在`React`可能存储为这样的`JS`代码：

```javascript
const VitrualDom = {
  type: 'div',
  props: { class: 'title' },
  children: [
    {
      type: 'span',
      children: 'Hello ConardLi'
    },
    {
      type: 'ul',
      children: [
        { type: 'li', children: '苹果' },
        { type: 'li', children: '橘子' }
      ]
    }
  ]
}
```

### 2.为何使用虚拟dom(好处)

#### （1）提高开发效率

使用`JavaScript`，我们在编写应用程序时的关注点在于如何更新`DOM`。

使用`React`，你只需要告诉`React`你想让视图处于什么状态，`React`则通过`VitrualDom`确保`DOM`与该状态相匹配。你不必自己去完成属性操作、事件处理、`DOM`更新，`React`会替你完成这一切。

这让我们更关注我们的业务逻辑而非`DOM`操作，这一点即可大大提升我们的开发效率。

#### （2）关于性能提升

直接操作`DOM`是非常耗费性能的，这一点毋庸置疑。但是`React`使用`VitrualDom`也是无法避免操作`DOM`的。

如果是首次渲染，`VitrualDom`不具有任何优势，甚至它要进行更多的计算，消耗更多的内存。

`VitrualDom`的优势在于`React`的`Diff`算法和批处理策略，`React`在页面更新之前，提前计算好了如何进行更新和渲染`DOM`。

所以，我更倾向于说，`VitrualDom`帮助我们提高了开发效率，在重复渲染时它帮助我们计算如何更高效的更新，而不是它比`DOM`操作更快。

#### （3）跨浏览器兼容

`React`基于`VitrualDom`自己实现了一套自己的事件机制，自己模拟了事件冒泡和捕获的过程，采用了事件代理，批量更新等方法，抹平了各个浏览器的事件兼容性问题。

#### （4）跨平台兼容

`VitrualDom`为`React`带来了跨平台渲染的能力。以`React Native`为例子。`React`根据`VitrualDom`画出相应平台的`ui`层，只不过不同平台画的姿势不同而已。

缺点：没法做极致的性能优化，比如vscode为了极致的性能优化采用手动操作dom的方式

### 3.react防止xss攻击

#### （1）自动转义

React 在渲染 HTML 内容和渲染 DOM 属性时都会将 `"'&<>` 这几个字符进行转义

#### （2）`ReactElement`有个属性是 `$$typeof`，

它是用来标记此对象是一个 `ReactElement`，React 在进行渲染前会通过此属性进行校验，校验不通过将会抛出上面的错误。React 利用这个属性来防止通过构造特殊的 Children 来进行的 XSS 攻击，原因是 `$$typeof` 是个 Symbol 类型，进行 JSON 转换后会 Symbol 值会丢失，无法在前后端进行传输。如果用户提交了特殊的 Children，也无法进行渲染，利用此特性，可以防止存储型的 XSS 攻击。

## 二.react的批处理机制（setstate）

### 1.钩子函数和合成事件中：

在`react`的生命周期和合成事件中，`react`仍然处于他的更新机制中，这时isBatchingUpdate为true。

按照上述过程，这时无论调用多少次`setState`，都会不会执行更新，而是将要更新的`state`存入`_pendingStateQueue`，将要更新的组件存入`dirtyComponent`。

当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件`didmount`后会将isBatchingUpdate设置为false。这时将执行之前累积的`setState`。

### 2.异步函数和原生事件中

由执行机制看，`setState`本身并不是异步的，而是如果在调用`setState`时，如果`react`正处于更新过程，当前更新会被暂存，等上一次更新执行后在执行，这个过程给人一种异步的假象。

在生命周期，根据JS的异步机制，会将异步函数先暂存，等所有同步代码执行完毕后在执行，这时上一次更新过程已经执行完毕，isBatchingUpdate被设置为false，根据上面的流程，这时再调用`setState`即可立即执行更新，拿到更新结果。

### 3.componentdidmount中调用setstate

不推荐直接在`componentDidMount`直接调用`setState`，由上面的分析：`componentDidMount`本身处于一次更新中，我们又调用了一次`setState`，就会在未来再进行一次`render`，造成不必要的性能浪费，大多数情况可以设置初始值来搞定。

当然在`componentDidMount`我们可以调用接口，再回调中去修改`state`，这是正确的做法(因为已经处于下次更新了)。

## 三.react事件机制

### 1.事件注册

组件装载 / 更新。

通过`lastProps`、`nextProps`判断是否新增、删除事件分别调用事件注册、卸载方法。

调用`EventPluginHub`的`enqueuePutListener`进行事件存储

获取`document`对象。

根据事件名称（如`onClick`、`onCaptureClick`）判断是进行冒泡还是捕获。

判断是否存在`addEventListener`方法，否则使用`attachEvent`（兼容IE）。

给`document`注册原生事件回调为`dispatchEvent`（统一的事件分发机制）。

### 2.事件存储

`EventPluginHub`负责管理React合成事件的`callback`，它将`callback`存储在`listenerBank`中，另外还存储了负责合成事件的`Plugin`。

`EventPluginHub`的`putListener`方法是向存储容器中增加一个listener。

获取绑定事件的元素的唯一标识`key`。

将`callback`根据事件类型，元素的唯一标识`key`存储在`listenerBank`中。

`listenerBank`的结构是：`listenerBank[registrationName][key]`。

### 3.事件触发和执行

- 触发`document`注册原生事件的回调`dispatchEvent`
- 获取到触发这个事件最深一级的元素
- 遍历这个元素的所有父元素，依次对每一级元素进行处理。
- 构造合成事件。
- 将每一级的合成事件存储在`eventQueue`事件队列中。
- 遍历`eventQueue`。
- 通过`isPropagationStopped`判断当前事件是否执行了阻止冒泡方法。
- 如果阻止了冒泡，停止遍历，否则通过`executeDispatch`执行合成事件。
- 释放处理完成的事件。

`react`在自己的合成事件中重写了`stopPropagation`方法，将`isPropagationStopped`设置为`true`，然后在遍历每一级事件的过程中根据此遍历判断是否继续执行。这就是`react`自己实现的冒泡机制。

### 4.合成事件

调用`EventPluginHub`的`extractEvents`方法。

循环所有类型的`EventPlugin`（用来处理不同事件的工具方法）。

在每个`EventPlugin`中根据不同的事件类型，返回不同的事件池。

在事件池中取出合成事件，如果事件池是空的，那么创建一个新的。

根据元素`nodeid`(唯一标识`key`)和事件类型从`listenerBink`中取出回调函数

返回带有合成事件参数的回调函数

### 5.合原生事件的区别

- `React` 事件使用驼峰命名，而不是全部小写。
- 通过 `JSX` , 你传递一个函数作为事件处理程序，而不是一个字符串。
- 在 React 中你不能通过返回`false` 来阻止默认行为。必须明确调用 `preventDefault`。

### 6.合成事件和原生事件执行顺序

- `react`的所有事件都挂载在`document`中
- 当真实dom触发后冒泡到`document`后才会对`react`事件进行处理
- 所以原生的事件会先执行
- 然后执行`react`合成事件
- 最后执行真正在`document`上挂载的事件

### 7.合成事件和原生事件可以混用嘛

`react`事件和原生事件最好不要混用。

原生事件中如果执行了`stopPropagation`方法，则会导致其他`react`事件失效。因为所有元素的事件将无法冒泡到`document`上。

由上面的执行机制不难得出，所有的react事件都将无法被注册。

## 四.react diff算法

- 首屏渲染会渲染一整棵 DOM 树
- 组件更新会根据变化的状态局部更新 DOM 树

React文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中 n 是树中元素的数量。

**为了降低算法复杂度，React的diff会预设三个限制：**

1. 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。
2. 两个不同类型的元素会产生出不同的树。如果元素由`div`变为`p`，React会销毁`div`及其子孙节点，并新建`p`及其子孙节点。
3. 开发者可以通过 `key`属性 来暗示哪些子元素在不同的渲染下能保持稳定。

```html
// 更新前
<div>
    <p key="ka">ka</p>
    <h3 key="song">song</h3>
</div>

// 更新后
<div>
    <h3 key="song">song</h3>
    <p key="ka">ka</p>
</div>
```

如果没有`key`，React会认为`div`的第一个子节点由`p`变为`h3`，第二个子节点由`h3`变为`p`。这符合限制2的设定，会销毁并新建。

但是当我们用`key`指明了节点前后对应关系后，React知道`key === "ka"`的`p`在更新后还存在，所以DOM节点可以复用，只是需要交换下顺序。

### 1.不同类型diff如何实现

我们可以从同级的节点数量将Diff分为两类：

1. 当`newChild`类型为`object`、`number`、`string`，代表同级只有一个节点
2. 当`newChild`类型为`Array`，同级有多个节点

#### 情况一：同级只有一个节点的Diff

从代码可以看出，React通过先判断`key`是否相同，如果`key`相同则判断`type`是否相同，只有都相同时一个DOM节点才能复用。

若不能复用则将该节点标记为删除，并新建一个fiber节点返回，若能复用则将上次更新的fiber节点副本作为本次新生成的fiber节点返回

#### 情况二：同级有多个节点的Diff

- 情况1 节点更新

- 情况2 节点新增或减少

- 情况3 节点位置变化

React团队发现，在日常开发中，相对于增加和删除，更新组件发生的频率更高。所以React Diff会优先判断当前节点是否属于更新。

fiber结构在兄弟节点间比较是单链表无法使用双指针，所以无法对算法使用双指针优化。

基于以上原因，Diff算法的整体逻辑会经历两轮遍历。

第一轮遍历：处理更新的节点。

第二轮遍历：处理剩下的不属于更新的节点。



#### 第一轮遍历步骤如下：

1. 遍历`newChildren`，`i = 0`，将`newChildren[i]`与`oldFiber`比较，判断DOM节点是否可复用。
2. 如果可复用，`i++`，比较`newChildren[i]`与`oldFiber.sibling`是否可复用。可以复用则重复步骤2。
3. 如果不可复用，立即跳出整个遍历。
4. 如果`newChildren`遍历完或者`oldFiber`遍历完（即`oldFiber.sibling === null`），跳出遍历。

当我们最终完成遍历后，会有两种结果：

结果一： 如果是步骤3跳出的遍历，`newChildren`没有遍历完，`oldFiber`也没有遍历完。

结果二： 如果是步骤4跳出的遍历，可能`newChildren`遍历完，或`oldFiber`遍历完，或他们同时遍历完。

#### 第二轮遍历

对于结果二，聪明的你想一想，`newChildren`没遍历完，`oldFiber`遍历完意味着什么？

老的DOM节点都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的`newChildren`依次执行插入操作（`Fiber.effectTag = Placement;`）。

同样的，我们举一反三。`newChildren`遍历完，`oldFiber`没遍历完意味着什么？

意味着多余的`oldFiber`在这次更新中已经不存在了，所以需要遍历剩下的`oldFiber`，依次执行删除操作（`Fiber.effectTag = Deletion;`）。

那么结果一怎么处理呢？`newChildren`与`oldFiber`都没遍历完，这意味着有节点在这次更新中改变了位置。

一定想到了，我们需要用`key`属性了。

为了快速的找到`key`对应的`oldFiber`，我们将所有还没处理的`oldFiber`放进以`key`属性为key，`Fiber`为value的`map`。再遍历剩余的`newChildren`，通过`newChildren[i].key`就能在`existingChildren`中找到`key`相同的`oldFiber`。

在diff函数入口定义一个lastPlacedIndex  = 0 该变量表示当前最后一个可复用节点

**abcd => acdb   cd不需要移动，b需要移动**

**abcd => dabc   d不需要移动，abc需要后移**

从这点可以看出，考虑性能，我们要尽量减少将节点从后面移动到前面的操作。

```
===第一轮遍历开始===
a（之后）vs a（之前）  
key不变，可复用
此时 a 对应的oldFiber（之前的a）在之前的数组（abcd）中索引为0
所以 lastPlacedIndex = 0;

继续第一轮遍历...

c（之后）vs b（之前）  
key改变，不能复用，跳出第一轮遍历
此时 lastPlacedIndex === 0;
===第一轮遍历结束===

===第二轮遍历开始===
newChildren === cdb，没用完，不需要执行删除旧节点
oldFiber === bcd，没用完，不需要执行插入新节点

将剩余oldFiber（bcd）保存为map

// 当前oldFiber：bcd
// 当前newChildren：cdb

继续遍历剩余newChildren

key === c 在 oldFiber中存在
const oldIndex = c（之前）.index;
即 oldIndex 代表当前可复用节点（c）在上一次更新时的位置索引
此时 oldIndex === 2;  // 之前节点为 abcd，所以c.index === 2
比较 oldIndex 与 lastPlacedIndex;

如果 oldIndex >= lastPlacedIndex 代表该可复用节点不需要移动
并将 lastPlacedIndex = oldIndex;
如果 oldIndex < lastplacedIndex 该可复用节点之前插入的位置索引小于这次更新需要插入的位置索引，代表该节点需要向右移动

在例子中，oldIndex 2 > lastPlacedIndex 0，
则 lastPlacedIndex = 2;
c节点位置不变
```

## 五.react组件如何进行复用

- 高阶组件:
  - 属性代理
  - 反向继承
- 渲染属性
- react-hooks

### mixin、hoc、render props、react-hooks的优劣如何？

#### **HOC的缺陷:**

- 扩展性限制: HOC 无法从外部访问子组件的 State因此无法通过shouldComponentUpdate滤掉不必要的更新,React 在支持 ES6 Class 之后提供了React.PureComponent来解决这个问题
- Ref 传递问题: Ref 被隔断,后来的React.forwardRef 来解决这个问题
- Wrapper Hell: HOC可能出现多层包裹组件的情况,多层抽象同样增加了复杂度和理解成本
- 命名冲突: 如果高阶组件多次嵌套,没有使用命名空间的话会产生冲突,然后覆盖老属性
- 不可见性: HOC相当于在原有组件外层再包装一个组件,你压根不知道外层的包装是啥,对于你是黑盒

#### **Render Props优点:**

- 上述HOC的缺点Render Props都可以解决

#### **Render Props缺陷:**

- 使用繁琐: HOC使用只需要借助装饰器语法通常一行代码就可以进行复用,Render Props无法做到如此简单
- 嵌套过深: Render Props虽然摆脱了组件多层嵌套的问题,但是转化为了函数回调的嵌套

#### **React Hooks优点:**

- 简洁: React Hooks解决了HOC和Render Props的嵌套问题,更加简洁
- 解耦: React Hooks可以更方便地把 UI 和状态分离,做到更彻底的解耦
- 组合: Hooks 中可以引用另外的 Hooks形成新的Hooks,组合变化万千
- 函数友好: React Hooks为函数组件而生,从而解决了类组件的几大问题:
  - this 指向容易错误
  - 分割在不同声明周期中的逻辑使得代码难以理解和维护
  - 代码复用成本高（高阶组件容易使代码量剧增）

#### **React Hooks缺陷:**

- 额外的学习成本（Functional Component 与 Class Component 之间的困惑）
- 写法上有限制（不能出现在条件、循环中），并且写法限制增加了重构成本
- 破坏了PureComponent、React.memo浅比较的性能优化效果（为了取最新的props和state，每次render()都要重新创建事件处函数）
- 在闭包场景可能会引用到旧的state、props值
- 内部实现上不直观（依赖一份可变的全局状态，不再那么“纯”）
- React.memo并不能完全替代shouldComponentUpdate（因为拿不到 state change，只针对 props change）

## 六.react fiber

### 1.如何理解fiber

React Fiber 是一种基于浏览器的**单线程调度算法**.

React 16之前 ，`reconcilation` 算法实际上是递归，想要中断递归是很困难的，React 16 开始使用了循环来代替之前的递归.

`Fiber`：**一种将 `recocilation` （递归 diff），拆分成无数个小任务的算法；它随时能够停止，恢复。停止恢复的时机取决于当前的一帧（16ms）内，还有没有足够的时间允许计算。**

fiber 也称[协程](https://www.liaoxuefeng.com/wiki/897692888725344/923057403198272)、或者纤程 **其实协程和线程并不一样，协程本身是没有并发或者并行能力的（需要配合线程），它只是一种控制流程的让出机制**。要理解协程，你得和普通函数一起来看, 比如Generator

React Fiber 的思想和协程的概念是契合的: **🔴React 渲染的过程可以被中断，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染**。

### 2.fiber结构

**将它视作一个执行单元，每次执行完一个'执行单元', React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去**.**`workLoop` 的工作大概猜到了，它会从更新队列(updateQueue)中弹出更新任务来执行，每执行完一个‘`执行单元`‘，就检查一下剩余时间是否充足，如果充足就进行执行下一个`执行单元`，反之则停止执行，保存现场，等下一次有执行权时恢复**:

```javascript
export type Fiber = {
  // Fiber 类型信息
  type: any,
  // ...

  // ⚛️ 链表结构
  // 指向父节点，或者render该节点的组件
  return: Fiber | null,
  // 指向第一个子节点
  child: Fiber | null,
  // 指向下一个兄弟节点
  sibling: Fiber | null,
}
```

React Fiber 也被称为虚拟栈帧(Virtual Stack Frame), 你可以拿它和函数调用栈类比一下, 两者结构非常像:

因为使用了**链表结构**，即使处理流程被中断了，我们随时可以从上次未处理完的`Fiber`继续遍历下去。整个迭代顺序和之前递归的一样

### 3.两阶段划分

- **⚛️ 协调阶段**: 可以认为是 Diff 阶段, **这个阶段可以被中断**, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更React 称之为'`副作用`(Effect)' . 以下生命周期钩子会在协调阶段被调用：
  - `constructor`
  - `componentWillMount` 废弃
  - `componentWillReceiveProps` 废弃
  - `static getDerivedStateFromProps`
  - `shouldComponentUpdate`
  - `componentWillUpdate` 废弃
  - `render`
- **⚛️ 提交阶段**: 将上一个阶段计算出来的需要处理的**副作用(Effects)**一次性执行了。**这个阶段必须同步执行，不能被打断**. 这些生命周期钩子在提交阶段被执行:
  - `getSnapshotBeforeUpdate()` 严格来说，这个是在进入 commit 阶段前调用
  - `componentDidMount`
  - `componentDidUpdate`
  - `componentWillUnmount`



也就是说，在协调阶段如果时间片用完，React就会选择让出控制权。因为协调阶段执行的工作不会导致任何用户可见的变更，所以在这个阶段让出控制权不会有什么问题。

需要注意的是：因为协调阶段可能被中断、恢复，甚至重做，**⚠️React 协调阶段的生命周期钩子可能会被调用多次!**, 例如 `componentWillMount` 可能会被调用两次。

因此建议 **协调阶段的生命周期钩子不要包含副作用**. 索性 React 就废弃了这部分可能包含副作用的生命周期方法，例如`componentWillMount`、`componentWillUpdate`. v17后我们就不能再用它们了, 所以现有的应用应该尽快迁移.

现在你应该知道为什么'提交阶段'必须同步执行，不能中断的吧？ 因为我们要正确地处理各种副作用，包括DOM变更、还有你在`componentDidMount`中发起的异步请求、useEffect 中定义的副作用... 因为有副作用，所以必须保证按照次序只调用一次，况且会有用户可以察觉到的变更, 不容差池

### 4.Reconcilation

思路和 Fiber 重构之前差别不大, 只不过这里不会再递归去比对、而且不会马上提交变更。

Fiber 包含的属性可以划分为 5 个部分:

- **🆕 结构信息** - 这个上文我们已经见过了，Fiber 使用链表的形式来表示节点在树中的定位
- **节点类型信息** - 这个也容易理解，tag表示节点的分类、type 保存具体的类型值，如div、MyComp
- **节点的状态** - 节点的组件实例、props、state等，它们将影响组件的输出
- **🆕 副作用** - 这个也是新东西. 在 Reconciliation 过程中发现的'副作用'(变更需求)就保存在节点的`effectTag` 中(想象为打上一个标记). 那么怎么将本次渲染的所有节点副作用都收集起来呢？ 这里也使用了链表结构，在遍历过程中React会将所有有‘副作用’的节点都通过`nextEffect`连接起来
- **🆕 替身** - React 在 Reconciliation 过程中会构建一颗新的树(官方称为workInProgress tree，**WIP树**)，可以认为是一颗表示当前工作进度的树。还有一颗表示已渲染界面的**旧树**，React就是一边和旧树比对，一边构建WIP树的。 alternate 指向旧树的同等节点。

上图是 Reconciliation 完成后的状态，左边是旧树，右边是WIP树。对于需要变更的节点，都打上了'标签'。 在提交阶段，React 就会将这些打上标签的节点应用变更。

### 5.双缓冲

React 中，WIP树就是一个缓冲，它在Reconciliation 完毕后一次性提交给浏览器进行渲染。它可以减少内存分配和垃圾回收，WIP 的节点不完全是新的，比如某颗子树不需要变动，React会克隆复用旧树中的子树。

双缓存技术还有另外一个重要的场景就是异常的处理，比如当一个节点抛出异常，仍然可以继续沿用旧树的节点，避免整棵树挂掉。

### 6.副作用收集

**🆕 副作用** - 这个也是新东西. 在 Reconciliation 过程中发现的'副作用'(变更需求)就保存在节点的`effectTag` 中(想象为打上一个标记). 那么怎么将本次渲染的所有节点副作用都收集起来呢？ 这里也使用了链表结构，在遍历过程中React会将所有有‘副作用’的节点都通过`nextEffect`连接起来

## 七.redux

### 1.说说对redux的理解



### 2.redux整个流程

整个工作流程：

1. 首先，用户（通过View）发出Action，发出方式就用到了dispatch方法。
2. 然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State
3. State一旦有变化，Store就会调用监听函数，来更新View。

到这儿为止，一次用户交互流程结束。可以看到，在整个流程中数据都是单向流动的，这种方式保证了流程的清晰。

### 3.react-redux是如何工作的?

- Provider: Provider的作用是从最外部封装了整个应用，并向connect模块传递store
- connect: 负责连接React和Redux
  - 获取state: connect通过context获取Provider中的store，通过store.getState()获取整个store tree 上所有state
  - 包装原组件: 将state和action通过props的方式传入到原组件内部wrapWithConnect返回一个ReactComponent对象Connect，Connect重新render外部传入的原组件WrappedComponent，并把connect中传入的mapStateToProps, mapDispatchToProps与组件上原有的props合并后，通过属性的方式传给WrappedComponent
  - 监听store tree变化: connect缓存了store tree中state的状态,通过当前state状态和变更前state状态进行比较,从而确定是否调用`this.setState()`方法触发Connect及其子组件的重新渲染

### 4.redux与mobx的区别?

**两者对比:**

- redux将数据保存在单一的store中，mobx将数据保存在分散的多个store中
- redux使用plain object保存数据，需要手动处理变化后的操作；mobx适用observable保存数据，数据变化后自动处理响应的操作
- redux使用不可变状态，这意味着状态是只读的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数；mobx中的状态是可变的，可以直接对其进行修改
- mobx相对来说比较简单，在其中有很多的抽象，mobx更多的使用面向对象的编程思维；redux会比较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用
- mobx中有更多的抽象和封装，调试会比较困难，同时结果也难以预测；而redux提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

**场景辨析:**

基于以上区别,我们可以简单得分析一下两者的不同使用场景.

mobx更适合数据不复杂的应用: mobx难以调试,很多状态无法回溯,面对复杂度高的应用时,往往力不从心.

redux适合有回溯需求的应用: 比如一个画板应用、一个表格应用，很多时候需要撤销、重做等操作，由于redux不可变的特性，天然支持这些操作.

mobx适合短平快的项目: mobx上手简单,样板代码少,可以很大程度上提高开发效率.

当然mobx和redux也并不一定是非此即彼的关系,你也可以在项目中用redux作为全局状态管理,用mobx作为组件局部状态管理器来用.

### 5.redux中如何进行异步操作?

当然,我们可以在`componentDidmount`中直接进行请求无须借助redux.

但是在一定规模的项目中,上述方法很难进行异步流的管理,通常情况下我们会借助redux的异步中间件进行异步处理.

redux异步流中间件其实有很多,但是当下主流的异步中间件只有两种redux-thunk、redux-saga，当然redux-observable可能也有资格占据一席之地,其余的异步中间件不管是社区活跃度还是npm下载量都比较差了.

### 6.redux异步中间件之间的优劣?

**redux-thunk优点:**

- 体积小: redux-thunk的实现方式很简单,只有不到20行代码
- 使用简单: redux-thunk没有引入像redux-saga或者redux-observable额外的范式,上手简单

**redux-thunk缺陷:**

- 样板代码过多: 与redux本身一样,通常一个请求需要大量的代码,而且很多都是重复性质的
- 耦合严重: 异步操作与redux的action偶合在一起,不方便管理
- 功能孱弱: 有一些实际开发中常用的功能需要自己进行封装

**redux-saga优点:**

- 异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中
- action摆脱thunk function: dispatch 的参数依然是一个纯粹的 action (FSA)，而不是充满 “黑魔法” thunk function
- 异常处理: 受益于 generator function 的 saga 实现，代码异常/请求失败 都可以直接通过 try/catch 语法直接捕获处理
- 功能强大: redux-saga提供了大量的Saga 辅助函数和Effect 创建器供开发者使用,开发者无须封装或者简单封装即可使用
- 灵活: redux-saga可以将多个Saga可以串行/并行组合起来,形成一个非常实用的异步flow
- 易测试，提供了各种case的测试方案，包括mock task，分支覆盖等等

**redux-saga缺陷:**

- 额外的学习成本: redux-saga不仅在使用难以理解的 generator function,而且有数十个API,学习成本远超redux-thunk,最重要的是你的额外学习成本是只服务于这个库的,与redux-observable不同,redux-observable虽然也有额外学习成本但是背后是rxjs和一整套思想
- 体积庞大: 体积略大,代码近2000行，min版25KB左右
- 功能过剩: 实际上并发控制等功能很难用到,但是我们依然需要引入这些代码
- ts支持不友好: yield无法返回TS类型

**redux-observable优点:**

- 功能最强: 由于背靠rxjs这个强大的响应式编程的库,借助rxjs的操作符,你可以几乎做任何你能想到的异步处理
- 背靠rxjs: 由于有rxjs的加持,如果你已经学习了rxjs,redux-observable的学习成本并不高,而且随着rxjs的升级redux-observable也会变得更强大

**redux-observable缺陷:**

- 学习成本奇高: 如果你不会rxjs,则需要额外学习两个复杂的库
- 社区一般: redux-observable的下载量只有redux-saga的1/5,社区也不够活跃,在复杂异步流中间件这个层面redux-saga仍处于领导地位

### 7.为什么reducer是纯函数以及为什么要返回一个新的state

reducer的职责不允许有副作用，副作用简单来说就是不确定性，如果reducer有副作用，那么返回的state就不确定.而redux提供可预测化的状态管理，即无论何时特定的action触发的行为永远保持一致，试想如果reducer中有Date.now()等非纯函数，即使同样的action,那么reducer处理过程中也是有所不同的，不再能保证可预测性

**源代码，我们发现，`var nextStateForKey = reducer(previousStateForKey, action)`, \**nextStateForKey\**就是通过 reducer 执行后返回的结果(state)，然后通过`hasChanged = hasChanged || nextStateForKey !== previousStateForKey`来比较新旧两个对象是否一致，***此比较法，比较的是两个对象的存储位置***，也就是浅比较法，所以，当我们 reducer 直接返回旧的 state 对象时，Redux 认为没有任何改变，从而导致页面没有更新。

#### 为什么这样设计呢？（性能）

因为比较两个 javascript 对象中所有的属性是否完全相同，唯一的办法就是深比较，然而，深比较在真实的应用中代码是非常大的，非常耗性能的，需要比较的次数特别多，所以一个有效的解决方案就是做一个规定，当无论发生任何变化时，开发者都要返回一个新的对象

八.hooks

