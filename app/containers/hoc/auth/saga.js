import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios'
import { fetch } from '../../../utils/post';
import { LOGIN_REQUEST, recieveLoginRequest } from './actions';

export const credentialsSelector = (state) => state.loginReducer.credentials


function* postLoginRequest() {
  console.log('hello from login saga');
  try {
    const credentials = yield select(credentialsSelector);
    const { email, password } = credentials
    const result = yield axios.post('/api/login', { email, password });
    yield put(recieveLoginRequest(result));
  } catch (e) {
    console.log(e);
  }
}


export default function* loginSaga() {
  console.log('before second')
  yield takeLatest(LOGIN_REQUEST, postLoginRequest);
}
