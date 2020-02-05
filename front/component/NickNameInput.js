import React, { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

const NickNameEditForm = () => {
  const [editedName, setEditedName] = useState("");
  const dispatch = useDispatch();
  const { me, isEditingNickname } = useSelector(state => state.UserReducer);

  const onChangeNickname = useCallback(e => {
    setEditedName(e.target.value);
  }, []);
  return (
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid #d9d9d9",
        padding: "20px"
      }}
    >
      <Input addonBefore="닉네임" value={me && me.nickname} />
      <Button type="primary">수정</Button>
    </Form>
  );
};

export default NickNameEditForm;
