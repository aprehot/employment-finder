import { call, put, takeLatest } from 'redux-saga/effects';

import axios from 'axios';
import { fetch } from '../../../utils/get';
import { USER_AUTH, handleAuth } from './actions';

function* handleAuthentication() {
  try {
    const result = yield axios.get('/api/auth');
    yield put(handleAuth(result));
  } catch (e) {
    console.log(e);
  }
}

export default function* authSaga() {
  yield takeLatest(USER_AUTH, handleAuthentication);
}
