import { GET_PROJECT_ID, PUT_PROJECT } from './ProjectPage/actions';


export default function (state = {}, action) {
  switch (action.type) {
    case GET_PROJECT_ID:
      return {
        ...state,
        projectId: action.projectId,
        projectData: ''
      };
    case PUT_PROJECT:
      return {
        ...state,
        projectData: action.projectData
      };
    default:
      return state;
  }
}
