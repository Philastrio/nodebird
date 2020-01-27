const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const router = express.Router();

// API는 다른 서비스가 내 서비스이 기능을 실행할 수 있게 열어둔 창구
router.get("/", (req, res) => {}); // 내정보 가져오는 것
router.post("/", async (req, res, next) => {
  // Post /api/user 회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        // 조건을 적으면 된다.
        userId: req.body.userId
      }
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다"); //  status 400~599 이 사이의 수는 에러를 의미한다
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); // 암호 패키지 크기인데, 너무 크면 오래거리기에 보통 10~12를 사용한다 salt는 10~13사이로
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword
    });
    console.log(newUser);
    return res.status(200).json(newUser); // 여기서 status는 안적으면 기본적으로200이다
    // send는 문자열 또는 버퍼도  보내는 것이지만, json은 json 데이터를 보내는 것이다.
  } catch (e) {
    console.error(e);
    /* return res.status(403).send(e) 이렇게 하거나*/
    return next(e); // 알아서 에러를 프론트로 넘겨준다 하지만 이러면 바로 에러처리를 못하고 넘겨줄 수 있으니 이것은 최후의 수단으로만 스자
  }
}); // 회원 가입
router.get("/:id", (req, res) => {}); // 남의가져오기 :id는 req.params.id로 가져올 수 있다
router.post("/logout", (req, res) => {}); // 로그아웃
router.post("/login", (req, res) => {}); // 로그인
router.get("/:id/follow", (req, res) => {}); // 로그아웃
router.post("/:id/follow", (req, res) => {}); // 로그아웃
router.delete("/:id/follow", (req, res) => {}); // 로그아웃
router.delete("/:id/follower", (req, res) => {}); // 로그아웃
router.get("/:id/posts", (req, res) => {});

module.exports = router;
