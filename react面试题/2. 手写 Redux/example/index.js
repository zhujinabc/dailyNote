import { createStore } from '../src';

function counter(state = 3, action) {
  if (typeof state === 'undefined') {
    return 0
  }
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counter);

var valueEl = document.getElementById('value');

// 渲染 value
function render() {
  valueEl.innerHTML = store.getState().toString();
}

// 手动渲染一次
render();

// 订阅数据更新，如果更新就执行 render 方法
store.subscribe(render);

/**
 * 点击 + value + 1
 */
document.getElementById('increment')
  .addEventListener('click', function () {
    // 触发数据变更
    store.dispatch({ type: 'INCREMENT' })
  });

/**
 * 点击 - value - 1
 */
document.getElementById('decrement')
  .addEventListener('click', function () {
    store.dispatch({ type: 'DECREMENT' })
  });

  // 如果是奇数 才 + 1
document.getElementById('incrementIfOdd')
  .addEventListener('click', function () {
    if (store.getState() % 2 !== 0) {
      store.dispatch({ type: 'INCREMENT' })
    }
  });