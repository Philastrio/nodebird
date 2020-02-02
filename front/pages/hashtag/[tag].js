import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../../reducers/post";
import PostCard from "../../component/PostCard";

const Hashtag = () => {
  const router = useRouter();
  const { tag } = router.query;
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.PostReducer);
  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag
    });
  }, []);
  return (
    <div>
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

export default Hashtag;
