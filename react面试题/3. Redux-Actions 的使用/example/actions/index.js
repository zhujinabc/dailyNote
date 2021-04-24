// export const increment = () => ({ type: 'INCREMENT' });
// export const decrement = () => ({ type: 'DECREMENT' });

import { createAction } from 'redux-actions';
export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');


// const { increment, decrement } = createActions({
//   INCREMENT: (amount = 1) => ({ amount }),
//   DECREMENT: (amount = 1) => ({ amount: -amount })
// });