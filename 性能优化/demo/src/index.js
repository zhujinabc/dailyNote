import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';

import appModels from './app/models';

import appRoute from './app/router';

import BasicLayout from './app/layouts/BasicLayout';

import Loading from './app/components/Loading';

// import 'antd/dist/antd.less';

export const history = createBrowserHistory()
const models = {...appModels };
const routes = [...appRoute];

const store = init({
  models,
  redux: {
    middlewares: [routerMiddleware(history)],
    rootReducers: {
      router: connectRouter(history)
    },
  },
});


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {/* kick it all off with the root route */}
      <BasicLayout>
        {/* 跟 lazy 对应 的菊花状态，固定写法，记住就完了 */}
        <Suspense fallback={<Loading />}>
          {renderRoutes(routes)}
        </Suspense>
        {/* {renderRoutes(routes)} */}
      </BasicLayout>
    </Router>
  </Provider>,
  document.getElementById('root')
);
