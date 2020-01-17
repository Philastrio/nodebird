import React from "react";
import { Form, Input, Button } from "antd";

const dummyUser = {
  name: "한강친구"
};

const NickNameInput = () => {
  return (
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid #d9d9d9",
        padding: "20px"
      }}
    >
      <Input addonBefore="닉네임" value={dummyUser.name} />
      <Button type="primary">수정</Button>
    </Form>
  );
};

export default NickNameInput;
