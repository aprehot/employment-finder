import { GET_PROJECT_ID, PUT_PROJECT } from './ProjectContainer/actions';
import { HANDLE_START_DATE, HANDLE_END_DATE, ACTION_BTN } from './userPost/actions';

interface IReducer {
  type: string,
  projectId: string,
  projectData: {}[],
  projectStart: Date,
  projectEnd: Date,
  actionBtn: string
}

const project = (state: {} = {}, {
  type,
  projectId,
  projectData,
  projectStart,
  projectEnd,
  actionBtn
}: IReducer) => {
  switch (type) {
    case GET_PROJECT_ID: // Gives the redux-saga the ID for the api to fetch specific project then calls PUT_PROJECT 
      return {
        ...state,
        projectId,
        projectData: ''
      };
    case PUT_PROJECT: // Doesnt POST new project, just fetches the project clicked by the user
      return {
        ...state,
        projectData
      };
    case HANDLE_START_DATE: // Used only for displaying the date in the calender input box when you click on a date
      return {
        ...state,
        projectStart
      };
    case HANDLE_END_DATE: // same as start date
      return {
        ...state,
        projectEnd
      };
    case ACTION_BTN:
      return {
        ...state,
        actionBtn
      }
    default:
      return state;
  }
}
export default project