import axios from 'axios';

export const postLogin = async ({ email, password }: any) => {
  try {
    const response = axios.post('/api/login', { email, password });
    return response;
  } catch (e) {
    console.log('catching in login api');
    return {
      isError: true,
    };
  }
};

export const postProject = async (project: any) => {
  try {
    const response = axios.post('/api/projects', project);
    console.log(response + 'success')
    return response;
  } catch (e) {
    console.log('catching while trying to POST project');
    return {
      isError: true,
    };
  }
};