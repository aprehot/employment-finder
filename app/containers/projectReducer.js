import { GET_PROJECT_ID, PUT_PROJECT } from './ProjectContainer/actions';


export default function (state = {}, { type, projectId, projectData }) {
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
    default:
      return state;
  }
}
