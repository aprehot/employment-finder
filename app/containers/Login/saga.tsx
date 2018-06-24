import {
    put,
    call,
    // select, 
    takeLatest
} from 'redux-saga/effects';

// import fetchData from '../../utils/fetch';
import {
    USER_LOGIN,
    // USER_AUTH,
    putUser,
    // putAuth 
} from './actions';
import { postLogin } from '../../utils/post';

export interface IValue {
    type: string;
    payload: IUserCred;
}
export interface IUserCred {
    data: {
        isAuth: boolean;
        id: string;
        email: string;
    }
}



export const userEmailSelector = (state: any) => state.login.email;
export const userPassSelector = (state: any) => state.login.password;

function* fetchCreds(action: any) {
    try {
        const contentRes = yield call(postLogin, action.payload);
        yield put(putUser(contentRes));
    } catch (e) {
        // history.push('/')
        console.log(e);
    }
}

export function* userLoginSaga() {
    yield takeLatest(USER_LOGIN, fetchCreds);
}