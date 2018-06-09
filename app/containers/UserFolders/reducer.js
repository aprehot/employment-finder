import { PUT_USER_FOLDERS, GET_USER_FOLDERS } from './actions';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER_FOLDERS:
      return {
        ...state,
        user: action.categoryType
      };
    case PUT_USER_FOLDERS:
      return {
        ...state,
        payload: action.payload
      };
    default:
      return state;
  }
}
