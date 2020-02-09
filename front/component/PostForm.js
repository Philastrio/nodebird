import React, { useCallback, useState, useEffect, useRef } from "react";
import { Form, Input, Button, Card, Icon, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE
} from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { imagePaths, isAddingPost, postAdded } = useSelector(
    state => state.PostReducer
  );
  const imageInput = useRef();

  useEffect(() => {
    if (postAdded) {
      setText("");
    }
  }, [postAdded]);

  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault(); // spa(single page application을 만들때는 무조건 이걸 넣어주지 않으면 페이지가 넘어가게 된다)
      if (!text || !text.trim()) {
        // trim 문자열 양쪽 공백제거(스페이스만 치는 사람들이 있어서 그럼)
        return alert("게시글을 작성하세요"); // return을 안적어주면 여기서 종료가 안되어 공백이 떠도 아래 dispatch로 넘어간다
      }
      const formData = new FormData();
      imagePaths.forEach(i => {
        formData.append("image", i); // 그냥 파일이면 image 가 아닌 file
      });
      formData.append("content", text);
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData
      });
    },
    [text] // 요거 안적어주면 빈 내용이 올라간다
  );

  const onChangeImages = useCallback(e => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append("image", f); // ajex를 쓸때는 FormData에 append를 써서 키 'image'와 값을 넣는다.
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback(
    index => () => {
      dispatch({
        type: REMOVE_IMAGE,
        index
      });
    },
    []
  );
  // onRemoveImage가 리턴구문에서 함수()로 쓰이면 index = () => {}처럼
  // 2번 괄호가 들어간다. 고차함수는 HOC처럼 기존 함수 기능을 확장한다
  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data" // 이미지, 파일, 동영상등은 multipart/form-data로 한다
      onSubmit={onSubmitForm}
    >
      <Input.TextArea
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
        value={text}
        onChange={onChangeText}
      />
      <div>
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
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
        {imagePaths.map((v, i) => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img
                src={`http://localhost:8080/${v}`}
                style={{ width: "200px" }}
                alt={v}
              />
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;
