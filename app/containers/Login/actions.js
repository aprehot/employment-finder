import axios from 'axios';

/* =============== USER =================== */

export function loginUser({ email, password }) {
  const request = axios.post('/api/login', { email, password })
    .then((response) => response.data);

  return {
    type: 'USER_LOGIN',
    payload: request
  };
}
export function auth() {
  const request = axios.get('/api/auth')
    .then((response) => response.data);

  return {
    type: 'USER_AUTH',
    payload: request
  };
}
