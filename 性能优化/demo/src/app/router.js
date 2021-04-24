import { lazy } from 'react';
// import Home from './containers/Home';
// import List from './containers/List';
// import About from './containers/About';

const routes = [
  {
    path: '/',
    component: lazy(() => import('./containers/Home')),
    exact: true,
  },
  {
    path: '/list',
    // component: List,
    component: lazy(() => import('./containers/List')),
    exact: true,
  },
  {
    path: '/about',
    // component: About,
    component: lazy(() => import('./containers/About')),
    exact: true,
  },
];

export default routes;
