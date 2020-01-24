import React from "react";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";

const NickNameInput = () => {
  const { user } = useSelector(state => state.UserReducer);
  return (
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid #d9d9d9",
        padding: "20px"
      }}
    >
      <Input addonBefore="닉네임" value={user.nickname} />
      <Button type="primary">수정</Button>
    </Form>
  );
};

export default NickNameInput;
