exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // next(e) 에러를 넣으면 에러를 처리한다
  } else {
    res.status(401).send("로그인이 필요합니다");
    console.log("로그인이 필요합니다");
  }
};
// 나중에는 어드민만 들어갈 수 있게 미들웨어를 달 수 있다
