// import axios from 'axios';
// import { put, takeLatest, select } from 'redux-saga/effects';
//
// import { LOGIN_REQUEST, recieveLoginRequest } from './actions';
//
// export const credentialsSelector = (state) => state.user.submission;
//
// function* postLoginRequest() {
//   try {
//     const credentials = yield select(credentialsSelector);
//     const { email, password } = credentials
//     const result = yield axios.post('/api/login', { email, password });
//     yield put(recieveLoginRequest(result.data));
//     // yield this.props.history.push('/dashboard');
//     console.log(result)
//   } catch (e) {
//     console.log(e);
//   }
// }
//
// export default function* loginSaga() {
//   yield takeLatest(LOGIN_REQUEST, postLoginRequest);
// }
