import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';

import {
    USER_AUTH,
    putAuth
} from './actions';
import axios from 'axios';
import { fetchGet } from '../../../utils/get';

export interface IValue {
    type: string;
    payload: IUserCred;
}
export interface IUserCred {
    data: {
        data: {
            isAuth: boolean;
            id: string;
            email: string;
        }
    }
}

function* fetchAuth() {
    try {
        const contentRes: IUserCred = yield call(fetchGet, '/api/auth');
        yield put(putAuth(contentRes.data));
    } catch (e) {
        console.log(e);
    }
}


export function* userAuthSaga() {
    yield takeLatest(USER_AUTH, fetchAuth);
}