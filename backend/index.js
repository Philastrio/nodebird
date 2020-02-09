const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");

const passportConfig = require("./passport");
const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const hashtagAPIRouter = require("./routes/hashtag");

dotenv.config(); // 이게 실행하는 것이다, 앱실행 전에 불러줘야 한다
const app = express(); // express를 불러와서 app이라는 객체를 만든다.
db.sequelize.sync();
passportConfig();

app.use(morgan("dev")); // app.use는 미들웨어들을 사용할때 쓴다
app.use("/", express.static("uploads")); // 6-10 이미지미리보기, 경로에 들어 있는 것을 다른 서버에서 자유롭게 가져갈수 있게 한다 업로드 경로를 루트('/')경로처럼 사용하게 해주겠다는 의미
// '/'은 프론트에서 접근하는 주소, 'uploads'는 실제 서버주소
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // json형식의 본문을 처리한다
app.use(express.urlencoded({ extended: true })); // form으로 넘어온 데이터를 처리한다. 요청 들어온 데이터를 바디에 넣어준다
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, // 이렇게하면 자바스크립트에서 쿠키에 접근하지 못한다
      secure: false // https 쓸때는 true이다
    },
    name: "birdCooCoo"
  })
);
app.use(passport.initialize()); // 이것들은 반드시 expressSession아래에 적어줘야 한다// 미들웨어간 서로 의존관계가 있는 경우에는 순서가 중요하다// 반드시 라우터 위에 있어야 한다
app.use(passport.session());

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);
app.use("/api/hashtag", hashtagAPIRouter);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
