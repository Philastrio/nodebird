const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");

const app = express(); // express를 불러와서 app이라는 객체를 만든다.
db.sequelize.sync();

app.use(morgan("dev")); // app.use는 미들웨어들을 사용할때 쓴다
app.use(express.json()); // json형식의 본문을 처리한다
app.use(express.urlencoded({ extended: true })); // form으로 넘어온 데이터를 처리한다. 요청 들어온 데이터를 바디에 넣어준다
app.use(cors());

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
