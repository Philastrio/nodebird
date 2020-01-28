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

  return (
    <>
      <Card
        actions={[
          <div key="twit">
            짹짹
            <br />
            {me.Post.length}
          </div>,
          <div key="following">
            팔로잉
            <br />
            {me.Followings.length}
          </div>,
          <div key="follower">
            팔로워
            <br />
            {me.Followers.length}
          </div>
        ]}
      >
        <Card.Meta avatar={<Avatar>{me.userId[0]}</Avatar>} title={me.userId} />
        <Button onClick={onLogout}>{me.userId}로그아웃 </Button>
      </Card>
    </>
  );
};

export default ProfileCard;
