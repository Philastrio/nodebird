import React, { useEffect } from "react";
import PostForm from "../component/PostForm";
import PostCard from "../component/PostCard";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { isLoggedIn, user } = useSelector(state => state.UserReducer);
  /* const user = useSelector(state => state.UserReducer.user);  성능최적화를 위해서는 이렇게 잘게 쪼개 주는 것이 중요하다*/
  const { mainPosts } = useSelector(state => state.PostReducer);

  /*  state: 전체 state. reducer에서 index를 의미하고 
  state.userReducer는 그중에 user.js의 userReducer를 의미 */

  return (
    <div>
      {user ? (
        <div>로그인 했습니다: {user.nickname}</div>
      ) : (
        <div>로그아웃 했습니다</div>
      )}
      {isLoggedIn && <PostForm dummy={mainPosts} />}
      {mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};
/* redux hooks 안쓸때의 코드: 3-7강의에 나옴 */
export default Home;
