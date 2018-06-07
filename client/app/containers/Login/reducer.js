// import { fromJS } from 'immutable';

// import { LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

// const initialState = fromJS({
//   user: ''
// });

// export default function (state = {}, action) {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         login: action
//       };
//     case LOGIN_FAILED:
//       return {
//         ...state
//       };
//     default:
//       return state;
//   }
// }
// import { RECIEVE_API_DATA } from './actions';
//
// function loginReducer(state = {}, action) {
//   switch (action.type) {
//     case RECIEVE_API_DATA:
//       return action.data;
//     default:
//       return state;
//   }
// }
//
// export default loginReducer;
