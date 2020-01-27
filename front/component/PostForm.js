import React, { useCallback, useState, useEffect } from "react";
import { Form, Input, Button, Card, Icon, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { imagePaths, isAddingPost, postAdded } = useSelector(
    state => state.PostReducer
  );

  useEffect(() => {
    if (postAdded) {
      setText("");
    }
  }, [postAdded]);

  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);

  const onSubmitForm = useCallback(e => {
    e.preventDefault(); // spa(single page application을 만들때는 무조건 이걸 넣어주지 않으면 페이지가 넘어가게 된다)
    dispatch({
      type: ADD_POST_REQUEST,
      data: { text }
    });
  }, []);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onSubmit={onSubmitForm}
    >
      <Input.TextArea
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
        value={text}
        onChange={onChangeText}
      />
      <div>
        <input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          loading={isAddingPost}
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map(v => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img
                src={`http://localhost:3000/${v}`}
                style={{ width: "200px" }}
                alt={v}
              />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;