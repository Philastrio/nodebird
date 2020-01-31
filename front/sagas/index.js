import { all, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./userSaga";
import postSaga from "./postSaga";

axios.defaults.baseURL = "http://localhost:8080/api"; // 이건 postSaga에도 영향을 준다
// import axios from 'axios' 모듈로 불러온 녀석은 캐싱이되어서 저장되기에...

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
