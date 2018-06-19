import { GET_PROJECT_ID, PUT_PROJECT } from './ProjectContainer/actions';
import { HANDLE_PROJ_TYPE, HANDLE_START_DATE, HANDLE_END_DATE } from './userPost/actions';

interface IReducer {
  type: string,
  projectId: string,
  projectData: {}[],
  projectType: string,
  projectStart: string,
  projectEnd: string,
}

const project = (state: {} = {}, {
  type,
  projectId,
  projectData,
  projectType,
  projectStart,
  projectEnd
}: IReducer) => {
  switch (type) {
    case GET_PROJECT_ID:
      return {
        ...state,
        projectId,
        projectData: ''
      };
    case PUT_PROJECT:
      return {
        ...state,
        projectData
      };
    case HANDLE_PROJ_TYPE:
      return {
        ...state,
        projectType
      };
    case HANDLE_START_DATE:
      return {
        ...state,
        projectStart
      };
    case HANDLE_END_DATE:
      return {
        ...state,
        projectEnd
      };
    default:
      return state;
  }
}
export default project