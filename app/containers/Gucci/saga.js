import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { fetch } from '../../utils/get';
import { REQUEST_API_DATA, receiveApiData } from './actions';


function* getApiData() {
  console.log('hello from saga');

  try {
    const result = yield call(fetch, 'api/users');
    yield put(receiveApiData(result));
  } catch (e) {
    console.log(e);
  }
}


export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}
