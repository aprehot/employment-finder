import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

// import request from 'utils/request';
// import { makeSelectLogin } from './selectors';
// import { loginFailed, loginSuccess } from './actions';

import { REQUEST_API_DATA, recieveApiData } from './actions';
import { fetchData } from './api';
// export function* createUserSaga() {
//   const username = yield select(makeSelectLogin());
//   const requestURL = '/api/login';
//
//   try {
//     const login = yield call(request, requestURL);
//     yield put(loginRequest(login, username));
//   } catch (err) {
//     console.log(err);
//   }
// }

// function* getApiData(action) {
//   try {
//     const data = yield call(fetchData)
//     yield put(recieveApiData(data))
//   } catch (e) {
//     console.log(e)
//   }
// }
//
// export default function* mySaga() {
//   yield takeLatest(REQUEST_API_DATA, getApiData)
// }

// export default function* onPostRecords() {
//   yield takeLatest('USER_LOGIN', async function* postRecords() {
//     try {
//       const response = await
//       fetch('/api/login');
//       const responseBody = response.json();
//       // axios.post('/api/login', {email,password})
//       // .then(response => response.data)
//     } catch (e) {
//       yield put(loginFailed(e))
//       return;
//     }
//     yield put(loginSuccess(responseBody));
//   });
// }


// export function* LoginSaga() {
//   yield takeLatest(USER_LOGIN, createUserSaga);
// }
