import React, { useEffect } from "react";
import PostForm from "../component/PostForm";
import PostCard from "../component/PostCard";

import { useSelector, useDispatch } from "react-redux";
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const { me } = useSelector(state => state.UserReducer);
  /* const user = useSelector(state => state.UserReducer.user);  성능최적화를 위해서는 이렇게 잘게 쪼개 주는 것이 중요하다*/
  const { mainPosts } = useSelector(state => state.PostReducer);
  const dispatch = useDispatch();
  /*  state: 전체 state. reducer에서 index를 의미하고 
  state.userReducer는 그중에 user.js의 userReducer를 의미 */

  useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST
    });
  }, []);
  return (
    <div>
      {me && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};
/* redux hooks 안쓸때의 코드: 3-7강의에 나옴 */

Home.getInitialProps = async context => {
  console.log(Object.keys(context));
  context.store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST
  });
};
export default Home;
