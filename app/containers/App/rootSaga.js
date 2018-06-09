import { all } from 'redux-saga/effects';

import userFoldersSaga from '../UserFolders/saga';

export default function* rootSaga() {
  yield all([
    userFoldersSaga()
  ]);
}
