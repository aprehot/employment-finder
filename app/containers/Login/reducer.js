import { PUT_USER_FOLDERS, GET_USER_FOLDERS } from '../UserFolders/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        login: action.payload
      };
    case 'USER_AUTH':
      return {
        ...state,
        login: action.payload
      };
    case PUT_USER_FOLDERS:
      return {
        ...state,
        userFolders: action
      };
    default:
      return state;
  }
}
