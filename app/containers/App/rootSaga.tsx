import { all } from 'redux-saga/effects';

import userFeedSaga from '../UserUpdates/saga';
import userProjectsSaga from '../ProjectContainer/saga';
import { userFolderContentsSaga, userFoldersSaga } from '../UserFolders/saga';
import {
  // userAuthSaga,
  userLoginSaga
} from '../Login/saga';

export default function* rootSaga() {
  yield all([
    // userAuthSaga(),
    userLoginSaga(),
    userFeedSaga(),
    userProjectsSaga(),
    userFoldersSaga(),
    userFolderContentsSaga(),
  ]);
}
