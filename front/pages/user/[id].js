import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { LOAD_USER_POSTS_REQUEST } from "../../reducers/post";
import PostCard from "../../component/PostCard";
import { Card, Avatar } from "antd";
import { LOAD_USER_REQUEST } from "../../reducers/user";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.PostReducer);
  const { userInfo } = useSelector(state => state.UserReducer);
  useEffect(() => {
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: id
    });
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id
    });
  }, []);
  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

export default User;
