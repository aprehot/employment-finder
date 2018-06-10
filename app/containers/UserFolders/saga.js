import { put, takeLatest, select, call } from 'redux-saga/effects';

import { GET_USER_FOLDERS_UPDATES, putFolders, putUpdates } from './actions';


export const userIdSelector = (state) => state.user.login.id;

const fetchData = async (res) => {
  try {
    const response = await res;
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

function* fetchFolders() {
  try {
    const requestParams = yield select(userIdSelector);
    const folderUri = fetch(`/api/user_folders?user=${requestParams}`);
    const updateUri = fetch('/api/user_updates');
    const folderRes = yield call(fetchData, folderUri);
    const updateRes = yield call(fetchData, updateUri);
    yield put(putFolders(folderRes));
    yield put(putUpdates(updateRes));
  } catch (e) {
    console.log(e);
  }
}

export default function* userFoldersSaga() {
  yield takeLatest(GET_USER_FOLDERS_UPDATES, fetchFolders);
}
