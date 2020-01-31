const express = require("express");
const next = require("next"); // express가 next를 실행할 것이다
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan("dev"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET)); // 서버쪽이랑 같이해주는게 좋다
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false
      }
    })
  );

  server.get("*", (req, res) => {
    // 모든 요청을 여기서 처리하겠다는 의미
    return handle(req, res);
  });
  server.listen(8000, () => {
    console.log("next+express running on port 8000");
  });
});
