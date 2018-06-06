import { call, put, select, takeLatest } from 'redux-saga/effects';


import { USER_LOGIN } from './constants';
import { makeSelectLogin } from './selectors';


export function* createUserSaga() {

// Select username from store
const username = yield select(makeSelectLogin());
const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
// const requestURL = '/api/login';

try {
  // Call our request helper (see 'utils/request')
  const repos = yield call(request, requestURL);
  yield put(reposLoaded(repos, username));
} catch (err) {
  yield put(repoLoadingError(err));
}
}

export function* LoginSaga() {
  yield takeLatest(USER_LOGIN, createUserSaga);
}


// export function loginUser({email, password}){
//   const request = axios.post('/api/login', {email,password})
//     .then(response => response.data)
//
//   return {
//     type: 'USER_LOGIN',
//     payload: request
//   }
// }
// export function auth(){
//   const request = axios.get('/api/auth')
//     .then(response =>response.data);
//
//     return {
//       type:'USER_AUTH',
//       payload: request
//     }
// }
