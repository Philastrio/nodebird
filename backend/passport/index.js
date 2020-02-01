const passport = require("passport");
const db = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 서버쪽에 [{id: 3, cookie: 'asdf'}]을 만들어 메모리에 보관하고 있다
    // 서버는 id=3만 저장하고(메모리에는 아이디만 기억하고 있다. )
    // 사용자 정보가 너무 많으니, cookie는 프론트로 보내서 asdf라는 쿠키는 id=3이구나 파악해서 일치를 시켜준다
    // 이런식으로 서버의 부담을 최소화 시킨다
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    /* id=3 이라는 정보를 가지고는 유저의 정보를 모두 알 수 없으니, 이를 역으로 해석해서 
    유저의 정보를 다시 찾는 것이다
    */
    try {
      const user = await db.User.findOne({
        where: { id },
        include: [
          {
            model: db.Post,
            as: "Posts",
            attributes: ["id"]
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
        ]
      });
      return done(null, user); // 여기서 불러온 유저 정보는 req.user에 저장된다
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};

// 프론트에서 서버로는 cookie만 보낸다(asdfgh)
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id: 3 발견
// id:3이 deserailizeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행된다.
// 실무에서는 deserializeUser 결과를 캐싱한다(node 교과서에 있음)
