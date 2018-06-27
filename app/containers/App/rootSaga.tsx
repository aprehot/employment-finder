import { all } from 'redux-saga/effects';

import userFeedSaga from '../UserUpdates/saga';
import userProjectsSaga from '../ProjectContainer/saga';
import { userFolderContentsSaga, userFoldersSaga } from '../ProjectStacks/saga';
import { userLoginSaga } from '../Login/saga';
import { userAuthSaga } from '../hoc/auth/saga';

export default function* rootSaga() {
  yield all([
    userAuthSaga(),
    userLoginSaga(),
    userFeedSaga(),
    userProjectsSaga(),
    userFoldersSaga(),
    userFolderContentsSaga(),
  ]);
}
