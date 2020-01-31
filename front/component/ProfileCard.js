import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";

const ProfileCard = () => {
  const { me } = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);
  console.log("ProfileCard me 출력유무", me);
  return <Button onClick={onLogout}>로그아웃</Button>;
};

export default ProfileCard;
