import { PUT_USER_FOLDERS, GET_FOLDER_CONTENTS, PUT_FOLDER_CONTENTS } from './UserFolders/actions';
import { PUT_USER_UPDATES } from './UserUpdates/actions';
import { USER_LOGIN, USER_AUTH } from './Login/actions';


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
    case GET_FOLDER_CONTENTS:
      return {
        ...state,
        contentRequest: action.contentRequest,
        folderContents: ''
      };
    case PUT_FOLDER_CONTENTS:
      return {
        ...state,
        folderContents: action.folderContents
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
