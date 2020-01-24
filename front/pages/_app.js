import React from "react";
import Head from "next/head";
import AppLayout from "../component/AppLayout";
import PropTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import reducer from "../reducers";
import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const NodeBird = ({ Component, store }) => {
  return (
    <Provider store={store}>
      {" "}
      {/* store : state, action, reducer가 합쳐진 것임 */}
      <Head>
        <title>NodeBird</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
        />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType, //jsx에 들어갈 수 있는 모든 것을 node라 한다
  store: PropTypes.object
};

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware]; //redux에는 없는 기능들을 추가하고 싶을때 미들웨어를 쓴다
  // 미들웨어는 액션과 스토어 사이에서 동작한다
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware)); // enhancer 기능을 향상시키다는 의미
  const store = createStore(reducer, initialState, enhancer);
  // 여기에다가 store 커스텀 마이징 한다
  sagaMiddleware.run(rootSaga);
  return store;
};
export default withRedux(configureStore)(NodeBird);
// HOC(High Order Component: 기존 컴포넌트를 확장해주는 것이다) props로 store를 넣어주는 역할을 한다
