import {
  PUT_USER_FOLDERS,
  GET_FOLDER_CONTENTS,
  PUT_FOLDER_CONTENTS
} from './ProjectStacks/actions';
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
    case PUT_AUTH: // Successful authentication will allow user to pass
      return {
        ...state,
        payload
      };
    case PUT_USER: // adds isAuth response which determines if user is redicrected to dashboard or denied entry
      return {
        ...state,
        payload
      };
    case GET_FOLDER_CONTENTS: // when a folder is clicked, display folder contents by querying ownder ID w/ folder name then call PUT_FOLDER_CONTENTS
      return {
        ...state,
        contentRequest,
        folderContents: ''
      };
    case PUT_FOLDER_CONTENTS:  // return project names to the folder that was clicked on
      return {
        ...state,
        folderContents
      };
    case PUT_USER_FOLDERS: // queries API for all folders listed under that owner ID
      return {
        ...state,
        userFolders
      };
    case PUT_USER_UPDATES: // static news feed list with images in backend using multer/express stores in memory on returning data
      return {
        ...state,
        userUpdates: userUpdates.staticFeed
      };
    default:
      return state;
  }
}
export default user