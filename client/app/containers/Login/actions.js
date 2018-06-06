import { USER_LOGIN } from './constants';

export const loginRequest = ({ email, password }) => ({
  type: USER_LOGIN,
  email,
  password
});
// const request = axios.post('/api/login', { email, password })
//   .then((response) => response.data);
