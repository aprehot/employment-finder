import { PUT_USER_FOLDERS } from '../UserFolders/actions';
import { PUT_USER_UPDATES } from '../UserUpdates/actions';
import { USER_LOGIN, USER_AUTH } from './actions';


export default function (state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        login: action.payload
      };
    case USER_AUTH:
      return {
        ...state,
        login: action.payload
      };
    case PUT_USER_FOLDERS:
      return {
        ...state,
        userFolders: action.userFolders
      };
    case PUT_USER_UPDATES:
      return {
        ...state,
        userUpdates: action.userUpdates.staticFeed
      };
    default:
      return state;
  }
}
