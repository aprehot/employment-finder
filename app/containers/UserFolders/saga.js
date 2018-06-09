import { put, takeLatest, select, call } from 'redux-saga/effects';

import { GET_USER_FOLDERS, putFolders } from './actions';


export const userIdSelector = (state) => state.user.login.id;

const fetchData = async (id) => {
  try {
    const response = await fetch(`/api/user_folders?user=${id}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

function* fetchFolders() {
  try {
    const requestParams = yield select(userIdSelector);
    const result = yield call(fetchData, requestParams);
    yield put(putFolders(result));
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

export default function* userFoldersSaga() {
  yield takeLatest(GET_USER_FOLDERS, fetchFolders);
}
