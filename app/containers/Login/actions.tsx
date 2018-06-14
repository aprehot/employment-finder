import axios from 'axios';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_AUTH = 'USER_AUTH';

/* =============== USER =================== */

export interface IActions {
  email: string;
  password: string;
}
export interface IValue {
  data: {
    type: string;
    payload: IUserCred;
    }
  }
export interface IUserCred {
  isAuth: boolean;
  id: string;
  email: string;
}


export const loginUser = ({ email, password }:IActions) => {
  const request = axios.post('/api/login', { email, password })
  .then((response):IValue => response.data);
  return {
    type: USER_LOGIN,
    payload: request
  };
}


export const auth = () => {
  const request = axios.get('/api/auth')
    .then((response):IValue => response.data);
  return {
    type: USER_AUTH,
    payload: request
  };
}

