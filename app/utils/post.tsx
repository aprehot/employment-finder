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
