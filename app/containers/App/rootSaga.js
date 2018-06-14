import { all } from 'redux-saga/effects';

import userFeedSaga from '../UserUpdates/saga';
import userProjectsSaga from '../ProjectContainer/saga';
import { userFolderContentsSaga, userFoldersSaga } from '../UserFolders/saga';

export default function* rootSaga() {
  yield all([
    userFeedSaga(),
    userProjectsSaga(),
    userFoldersSaga(),
    userFolderContentsSaga(),
  ]);
}
