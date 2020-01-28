import { all, fork, put, takeEvery, delay, call } from "redux-saga/effects";
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  LOG_IN_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS
} from "../reducers/user";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api";

function loginAPI(loginData) {
  return axios.post("/user/login", loginData, { withCredentials: true }); // loginData에 userId, password가 들어 있다 쿠키를 주고받기 위해 withCredentials를 넣는다
} // 서버에서는 cors가 담당한다(index.js에서 찾아볼것)

function* logIn(action) {
  try {
    //yield call(loginAPI); // call은 함수 동기적 호출
    const result = yield call(loginAPI, action.data);

    yield put({
      // put은 dispatch와 동일
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    // loginAPI실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogin() {
  /* yield takeLatest(LOG_IN, login); // takeLatest가 LOG_IN 액션이 dispatch되길 기다려서 dispatch될때 login 제너레이터를 호출한다 */
  /* yield take({
    type: L
  }); // LOG_IN 이라는 액션이 실행되면 중단점이 풀린다
  yield put({
    type: LOG_IN_SUCCESS // LOG_IN을 받으면 LOG_IN_SUCCESS를 실행한다
  }); */
  yield takeEvery(LOG_IN_REQUEST, logIn);
}
////////////////////////////////////////////////////////////////
function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post("/user/", signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data); // 첫번째: 함수, 두번재 : 인자
    console.log(action.data);
    yield put({
      // put은 dispatch와 동일
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    // loginAPI실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
/* SAGA가 어렵다면 이 3개지 함수를 복붙하면 된다 */
////////////////////////////////////////////////////////////////

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchSignUp)]);
}
