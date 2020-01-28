const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require('bcrypt');
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId", // req.body 속성을 적어주면 된다
        passwordField: "password"
      },
      async (userId, password, done) => {
        try {
          const user = await db.User.findOne({ where: { userId } });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자 입니다" });
            // done(첫번째인수: 서버쪽 에러, 두번째 인수: 성공했을때, 서버쪽 에러는 아닌데
              //로직상의 에러일 경우
             
          }
          const result = await bcrypt.compare(password, user.password); 
          // 첫번째: 프론트에서 보낸 패스워드
          // 두번째: 서버에 저장된 것
          if (result) {
            return done(null, user); // 성공했으니 user를 돌려준다
          }
          return done(null, false, {reason: "비밀번호가 틀립니다"})
        } catch (e) {
          console.error(e);
          return done(e); // 서버에러이기에 첫번째 인수에 담아서 보내준다 
        }
      }
    )
  );
};
//local은 전략을 적는 곳이다