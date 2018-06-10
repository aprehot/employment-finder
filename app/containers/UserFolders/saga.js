import { put, takeLatest, select, call } from 'redux-saga/effects';

import { GET_USER_FOLDERS, putFolders } from './actions';
import fetchData from '../../utils/fetch';

export const userIdSelector = (state) => state.user.login.id;


function* fetchFolders() {
  try {
    const requestParams = yield select(userIdSelector);
    const folderUri = fetch(`/api/user_folders?user=${requestParams}`);
    const folderRes = yield call(fetchData, folderUri);
    yield put(putFolders(folderRes));
  } catch (e) {
    console.log(e);
  }
}

export default function* userFoldersSaga() {
  yield takeLatest(GET_USER_FOLDERS, fetchFolders);
}
