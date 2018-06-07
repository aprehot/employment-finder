export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const RECIEVE_LOGIN = 'RECIEVE_LOGIN';

export const loginRequest = (credentials) => ({ type: LOGIN_REQUEST, payload: credentials });
export const recieveLoginRequest = (data) => ({ type: RECIEVE_LOGIN, payload: data });
