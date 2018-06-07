import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { REQUEST_API_DATA, receiveApiData } from "./actions";
import { fetchData, fetch } from "./api";
import axios from 'axios'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getApiData(action) {
  console.log('hello from saga')

  try {
    const result = yield call(fetch, 'api/users')
    // do api call
    // const request = yield axios('/api/folders?skip=0&limit=none&order=desc')
    // const data = request.then((response) => response.data)
    yield put(receiveApiData(result));
  } catch (e) {
    console.log(e);
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}
