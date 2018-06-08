import axios from 'axios';
/* Saga Actions for Login and Auth */
// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const RECIEVE_LOGIN = 'RECIEVE_LOGIN';
//
// export const loginRequest = (credentials) => ({ type: LOGIN_REQUEST, payload: credentials });
// export const recieveLoginRequest = (data) => ({ type: RECIEVE_LOGIN, payload: data });


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
