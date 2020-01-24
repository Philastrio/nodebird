import React from "react";
import Link from "next/link";
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from "antd";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector(state => state.UserReducer);
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
        {" "}
        {/* gutter: Col간의 간격 // Form은 state를 가지고 있기에 분리해주는 것이 좋다 */}
        <Col xs={24} md={6}>
          {isLoggedIn ? <ProfileCard /> : <LoginForm />}
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
