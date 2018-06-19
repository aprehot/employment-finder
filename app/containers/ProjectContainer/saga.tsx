import { put, takeLatest, select, call } from 'redux-saga/effects';

import { GET_PROJECT, GET_PROJECT_ID, putProject } from './actions';
import fetchData from '../../utils/fetch';

export const projectIdSelector = (state: any) => state.project.projectId;

function* fetchProject() {
  try {
    const projectId = yield select(projectIdSelector);
    const contentsUri = fetch(`/api/projects/folder_projects/${projectId}`);
    const contentRes = yield call(fetchData, contentsUri);
    yield put(putProject(contentRes));
  } catch (e) {
    console.log(e);
  }
}

function* initiateFetch() {
  yield takeLatest(GET_PROJECT, fetchProject);
}

export default function* userProjectsSaga() {
  yield takeLatest(GET_PROJECT_ID, initiateFetch);
}
