// export default (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     default:
//       return state
//   }
// };


import { handleActions } from 'redux-actions';
export default handleActions(
  {
    INCREMENT: (state) => state + 1,
    DECREMENT: (state) => state - 1,
  },
  0,
);