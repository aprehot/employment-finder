import axios from 'axios';
import { put, takeLatest, select, call } from 'redux-saga/effects';

import { GET_USER_FOLDERS, putFolders } from './actions';


export const userIdSelector = (state) => state.user.login.id;
export const categorySelector = (state) => state.user.categoryType;
export const userSelector = (state) => state.user

const userFolderRequest = ({ login, categoryType }) => {
  axios.get(`/api/user_folders?user=${login.id}&category=${categoryType}`);
};

// TODO: identify whether or not this.state.personal is true or false(depends on if personal is selected in UI)
// if false default to company, if true, pass in personal


function* fetchFolders() {
  try {
    // const requestParams = yield select(userIdSelector);
    const requestParams = yield select(userSelector);
    console.log(requestParams)
    const result = yield call(userFolderRequest(requestParams));
    yield put(putFolders(result.data));
    console.log(result.data);
  } catch (e) {
    console.log(e);
  }
}

export default function* userFoldersSaga() {
  yield takeLatest(GET_USER_FOLDERS, fetchFolders);
}
