import React from "react";
import Link from "next/link";
import { Menu, Input, Button, Row, Col, Card, Avatar, Form } from "antd";
import PropTypes from "prop-types";

const dummy = {
  nickname: "한초보",
  Post: [],
  Followings: [],
  Followers: []
};

const AppLayout = ({ children }) => {
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
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          <Card
            actions={[
              <div key="twit">
                짹짹
                <br />
                {dummy.Post.length}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {dummy.Followings.length}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {dummy.Followers.length}
              </div>
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
              title={dummy.nickname}
            />
          </Card>
          <Form>
            <div>
              <label htmlFor="user-id">아이디</label>
              <br />
              <Input name="user-id" required />
            </div>
            <div>
              <label htmlFor="user-id">비밀번호</label>
              <br />
              <Input name="user-password" type="password" required />
            </div>
            <div>
              <Button type="primary" htmlType="submit" loading={false}>
                로그인
              </Button>
              <Link href="/signup">
                <a>
                  <Button>회원가입</Button>
                </a>
              </Link>
            </div>
          </Form>
        </Col>
        <Col xs={24} md={12}>
          두번째
        </Col>
        <Col xs={24} md={6}>
          세번째
        </Col>
      </Row>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};

export default AppLayout;
