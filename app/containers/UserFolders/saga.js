import { put, takeLatest, select, call } from 'redux-saga/effects';

import { GET_USER_FOLDERS, GET_FOLDER_CONTENTS, putFolders, putContents } from './actions';
import fetchData from '../../utils/fetch';

export const userIdSelector = (state) => state.user.login.id;
export const folderContentsSelector = (state) => state.user.contentRequest;

function* fetchFolderContents() {
  try {
    const userId = yield select(userIdSelector);
    const contentRequest = yield select(folderContentsSelector);
    const contentsUri = fetch(`/api/projects/folder_projects?ownerId=${userId}&parentFolder=${contentRequest[0]}&parentCategory=${contentRequest[1]}`);
    const contentRes = yield call(fetchData, contentsUri);
    yield put(putContents(contentRes));
  } catch (e) {
    console.log(e);
  }
}

export function* userFolderContentsSaga() {
  yield takeLatest(GET_FOLDER_CONTENTS, fetchFolderContents);
}

function* fetchFolders() {
  try {
    const requestParams = yield select(userIdSelector);
    const folderUri = fetch(`/api/folders/user_folders?ownerId=${requestParams}`);
    const folderRes = yield call(fetchData, folderUri);
    yield put(putFolders(folderRes.folders));
  } catch (e) {
    console.log(e);
  }
}

export function* userFoldersSaga() {
  yield takeLatest(GET_USER_FOLDERS, fetchFolders);
}
