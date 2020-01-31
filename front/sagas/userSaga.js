import { all, fork, put, takeEvery, delay, call } from "redux-saga/effects";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS
} from "../reducers/user";
import axios from "axios";

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

function* watchLogIn() {
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
function logOutAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post("/user/logout", {}, { withCredentials: true });
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    // loginAPI실패
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}
////////////////////////////////////////////////////////////////
function loadUserAPI(userId) {
  return axios.get(userId ? `/user/${userId}` : "/user/", {
    withCredentials: true
  }); // 서버는 로그인 여부를 프론트에서 보내는 쿠키로 판단한다. 따라서 데이터는 필요없다
} // get의 경우 데이터가 없기에 두번째 객체는 안넣어줘도 된다. 따라서 두번째 칸이 설저이 된다.
// loadUser는 내정보를 처음에 쿠키로 가져오는 것이다. 세션쿠키를 서버가 유효한 쿠키라 판단해서 가져온다
function* loadUser(action) {
  //쿠키는 알아서 보내주는 것이라 데이터는 필요없다
  try {
    const result = yield call(loadUserAPI, action.data);

    yield put({
      // put은 dispatch와 동일
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data
    });
    console.log("loadUser console", result.data);
  } catch (e) {
    // loginAPI실패
    console.log(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}
///////////////////////////////////////////////

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchSignUp)
  ]);
}
