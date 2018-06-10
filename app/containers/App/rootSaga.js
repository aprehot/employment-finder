import { all } from 'redux-saga/effects';

import userFoldersSaga from '../UserFolders/saga';
import userFeedSaga from '../UserUpdates/saga';

export default function* rootSaga() {
  yield all([
    userFoldersSaga(),
    userFeedSaga()
  ]);
}
