import { all, takeLatest, put, fork, delay, call } from "redux-saga/effects";
import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST
} from "../reducers/post";
import axios from "axios";
import { ADD_POST_TO_ME } from "../reducers/user";

function addPostAPI(postData) {
  return axios.post("/post", postData, { withCredentials: true });
}

function* addPost(action) {
  try {
    //yield delay(1000); // 서버가 없어서 이렇게 2초로 했음
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost); // 게시글은 마지막 1번만 작성되것이 맞기에
}
function loadMainPostsAPI() {
  return axios.get("/posts"); //누구나 글을 봐야 하는 상황이기에 withCredentials 안붙여도 된다
}

function* loadMainPosts() {
  try {
    const result = yield call(loadMainPostsAPI); //서버 갔다온 것이 result이다
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e
    });
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts); // 게시글은 마지막 1번만 작성되것이 맞기에
}
/////////////////////////////////////
function loadHashtagPostsAPI(tag) {
  return axios.get(`/hashtag/${tag}`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data); //서버 갔다온 것이 result이다
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: e
    });
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts); // 게시글은 마지막 1번만 작성되것이 맞기에
}
/////////////////////////////////////
/////////////////////////////////////
function loadUserPostsAPI(id) {
  return axios.get(`/user/${id}/posts`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data); //서버 갔다온 것이 result이다
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e
    });
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts); // 게시글은 마지막 1번만 작성되것이 맞기에
}
/////////////////////////////////////
function* addCommentAPI() {}

function* addComment(action) {
  try {
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId
      }
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadMainPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts)
  ]);
}
