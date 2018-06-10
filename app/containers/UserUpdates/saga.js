import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_USER_UPDATES, putUpdates } from './actions';
import fetchData from '../../utils/fetch';

export const userIdSelector = (state) => state.user.login.id;


function* fetchUpdates() {
  try {
    const updateUri = fetch('/api/user_updates');
    const updateRes = yield call(fetchData, updateUri);
    yield put(putUpdates(updateRes));
  } catch (e) {
    console.log(e);
  }
}

export default function* userFeedSaga() {
  yield takeLatest(GET_USER_UPDATES, fetchUpdates);
}
