export const USER_AUTH = 'USER_AUTH';
export const USER_LOGIN = 'USER_LOGIN';
export const PUT_AUTH = 'PUT_AUTH';
export const PUT_USER = 'PUT_USER';

// import { IUserCred } from './saga';

export interface IActions {
  email: string;
  password: string;
}

export const authenticateUser = () => ({ type: USER_AUTH });
export const loginUser = ({ email, password }: { email: string; password: string }) => ({ type: USER_LOGIN, payload: { email, password } });
export const putUser = (response: any) => {
  console.log(response);
  return { type: PUT_USER, payload: response.data }
};
// export const putAuth = (response: IUserCred) => ({ type: PUT_AUTH, payload: response.data });




// export const loginUser = ({ email, password }:IActions) => {
//   const request = axios.post('/api/login', { email, password })
//   .then((response):IValue => response.data);
//   return {
//     type: USER_LOGIN,
//     payload: request
//   };
// }


// export const auth = () => {
//   const request = axios.get('/api/auth')
//     .then((response):IValue => response.data);
//   return {
//     type: USER_AUTH,
//     payload: request
//   };
// }

