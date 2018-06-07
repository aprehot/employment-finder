import { all } from 'redux-saga/effects';

import mySaga from '../Gucci/saga';
import loginSaga from '../hoc/auth/saga';

export default function* rootSaga() {
  yield all([
    mySaga(),
    loginSaga()
  ]);
}
