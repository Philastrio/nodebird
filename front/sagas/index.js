import { all, call } from "redux-saga/effects";
import userSaga from "./userSaga";
import postSaga from "./postSaga";

export default function* rootSaga() {
  yield all([call(userSaga), call(postSaga)]);
}
