export const GET_PROJECT_ID = 'GET_PROJECT_ID';
export const GET_PROJECT = 'GET_PROJECT';
export const PUT_PROJECT = 'PUT_PROJECT';

export const getProjectId = (projectId) => ({ type: GET_PROJECT_ID, projectId });
export const getProject = () => ({ type: GET_PROJECT });
export const putProject = (projectData) => ({ type: PUT_PROJECT, projectData });
