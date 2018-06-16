import {
  PUT_USER_FOLDERS,
  GET_FOLDER_CONTENTS,
  PUT_FOLDER_CONTENTS
} from './UserFolders/actions';
import { PUT_AUTH } from './hoc/auth/actions';
import { PUT_USER } from './Login/actions';
import { PUT_USER_UPDATES } from './UserUpdates/actions';


interface IReducer {
  type: string,
  payload: {
    isAuth: boolean,
    id: string,
    email: string,
    accountType?: string
  },
  contentRequest: string[],
  folderContents: {
    projects: {}[]
  },
  userFolders: {}[],
  userUpdates: {
    staticFeed: {}[]
  }
}

const user = (state: {} = {}, {
  type,
  payload,
  contentRequest,
  folderContents,
  userFolders,
  userUpdates
}: IReducer) => {
  switch (type) {
    case PUT_AUTH:
      return {
        ...state,
        payload
      };
    // case USER_LOGIN:
    //   return {
    //     ...state,
    //     payload
    //   };
    case PUT_USER:
      return {
        ...state,
        payload
      };
    case GET_FOLDER_CONTENTS:
      return {
        ...state,
        contentRequest,
        folderContents: ''
      };
    case PUT_FOLDER_CONTENTS:
      return {
        ...state,
        folderContents
      };
    case PUT_USER_FOLDERS:
      return {
        ...state,
        userFolders
      };
    case PUT_USER_UPDATES:
      return {
        ...state,
        userUpdates: userUpdates.staticFeed
      };
    default:
      return state;
  }
}
export default user