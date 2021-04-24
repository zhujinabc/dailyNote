import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import Counter from './components/Counter';
import counter from './reducers';

const middleware = applyMiddleware(logger);
// 1. 调用 createStore 方法创建一个 Store 对象
const store = createStore(counter, middleware);
const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
  // 2. 使用 Provider 将根组件包裹，并传入 Store 对象
  <Provider store={store}>
    <Counter />
  </Provider>,
  rootEl
);

render();