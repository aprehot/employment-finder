import { GET_PROJECT_ID, PUT_PROJECT } from './ProjectContainer/actions';
import { HANDLE_PROJ_TYPE } from './userPost/actions';

interface IReducer {
  type: string,
  projectId: string,
  projectData: {}[],
  projectType: string
}

const project = (state: {} = {}, {
  type,
  projectId,
  projectData,
  projectType
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
    default:
      return state;
  }
}
export default project