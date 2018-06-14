import { GET_PROJECT_ID, PUT_PROJECT } from './ProjectContainer/actions';

interface IReducer {
  type: string,
  projectId: string,
  projectData: {}[]
}

const project = (state: {} = {}, { 
  type,
  projectId,
  projectData 
}:IReducer) => {
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
export default project