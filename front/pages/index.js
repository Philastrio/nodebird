import React from "react";
import { Form, Input, Button, Card, Icon, Avatar } from "antd";
import PostForm from "../component/PostForm";
import PostCard from "../component/PostCard";

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nickname: "hankang"
      },
      content: "첫번째 게시글",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTi-sZc6qlfX92vpDzNxKG1Vrg4g_rm1VIdgM2W8Y_wqowrZvT&s"
    }
  ]
};

const Home = () => {
  return (
    <div>
      {dummy.isLoggedIn && <PostForm dummy={dummy} />}
      {dummy.mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};

export default Home;
