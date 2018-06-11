import { all } from 'redux-saga/effects';

import { userFolderContentsSaga, userFoldersSaga } from '../UserFolders/saga';
import userFeedSaga from '../UserUpdates/saga';
import userProjectsSaga from '../ProjectContainer/saga';

export default function* rootSaga() {
  yield all([
    userFolderContentsSaga(),
    userFoldersSaga(),
    userFeedSaga(),
    userProjectsSaga()
  ]);
}
