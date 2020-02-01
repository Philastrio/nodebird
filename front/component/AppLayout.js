import React, { useEffect } from "react";
import Link from "next/link";
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from "antd";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";

import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER_REQUEST } from "../reducers/user";
import UserProfile from "./UserProfile";

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!me) {
      dispatch({
        type: LOAD_USER_REQUEST
      }); // 유저가 어디서 접속할지를 알수 없기에 공통된 곳에서 쿠키로 유저 정보를 불러온다
      // 로그인을 안했다면 쿠키도 없으니 LOAD_USER_REQUEST를 실행할 수 없다
    }
  }, []);
  /* gutter: Col간의 간격 // Form은 state를 가지고 있기에 분리해주는 것이 좋다 */
  return (
    <div>
      <Menu mode={"horizontal"}>
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="profile">
          <Link href="/profile">
            <a>내 프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <Link href="https://blog.naver.com/han_gang">
            <a target="_blank">Made by HanKang</a>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default AppLayout;
