import React from "react";
import { Form, Input, Button, List, Card, Icon } from "antd";
import NickNameInput from "../component/NickNameInput";

const Profile = () => {
  return (
    <div>
      <NickNameInput/>
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        bordered
        dataSource={["한강", "이아롬", "한지희"]}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key="stop" type="stop" />]}>
              {" "}
              {/* 배열안에 jsx를 쓸때는 반드시 key를 넣어줘야 한다.  */}
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        bordered
        dataSource={["한강", "이아롬", "한지희"]}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon type="stop"></Icon>]}>
              <Card.Meta description={item}></Card.Meta>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Profile;
