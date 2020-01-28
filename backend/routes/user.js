const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

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

router.post("/logout", (req, res) => {
  req.logOut();
  req.session.destroy(); // 2개만 적어주면 로그아웃된다
  req.send("로그아웃 성공");
}); // 로그아웃

router.post("/login", (req, res, next) => {
  // Post /api/user/login
  passport.authenticate("local", (err, user, info) => {
    /* err,user,info는 done의 3개의 인자이다 */
    if (err) {
      //서버에러의경우
      console.error(err);
      return res.status(555).send(info.reason);
    }
    if (info) {
      //로직상의 에러인 경우
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      // 아무이상 없으면 로그인을 시키는데
      try {
        if (loginErr) {
          return console.log("login Error", loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post, // include하면 관계를 맺어준 모든 것들을 가져온다 하지만 반드시 as를 붙여야 한다
              as: "Posts",
              attributes: ["id"] // 갯수를 셀 것이기에 id만 가도 충분하다
            },
            {
              model: db.User,
              as: "Followings",
              attributes: ["id"]
            },
            {
              model: db.User,
              as: "Followers",
              attributes: ["id"]
            }
          ],
          attributes: ["id", "nickname", "userId"] // 프론트에는 비밀번호 배고 보낸다
        });
        console.log(fullUser);
        return res.json(fullUser); // 그냥 user로 하면 패스워드까지 그냥 드러나기에 한번 걸러준다
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next); // kakao 로그인 구현하게 되면 여기에 kakao를 넣으면 된다
}); // 로그인
router.get("/:id/follow", (req, res) => {}); // 로그아웃
router.post("/:id/follow", (req, res) => {}); // 로그아웃
router.delete("/:id/follow", (req, res) => {}); // 로그아웃
router.delete("/:id/follower", (req, res) => {}); // 로그아웃
router.get("/:id/posts", (req, res) => {});

module.exports = router;
