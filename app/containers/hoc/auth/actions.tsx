import { IUserCred } from "../../Login/saga";

export const USER_AUTH = 'USER_AUTH';
export const PUT_AUTH = 'PUT_AUTH';

export interface IActions {
    email: string;
    password: string;
}

export const authenticateUser = () => ({ type: USER_AUTH });
export const putAuth = (response: IUserCred) => ({ type: PUT_AUTH, payload: response.data });



