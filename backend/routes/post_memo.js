const express = require("express");
const db = require("../models");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g); //한강 파이팅 #멋져 #잘생김 음하하 -> 멋져, 잘생김을 뽑아낸다
    //문자열을 뽑아낼때 정규표현식을 사용한다
    const newPost = await db.Post.create({
      content: req.body.content,
      userId: req.user.id
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.HashTag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }
          })
        )
      );
      console.log(result);
      await newPost.addHashtags(result.map(r => r[0]));
    }

    /* const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{ model: db.User }]
    }); 
    res.json(fullPost); 이렇게 할 수 도 있다  
    // 이렇게 한번더 찾아줘야 한다. 그렇치 않으면 빈 것이 올라간다
    */
    const User = await newPost.getUser();
    newPost.User = User;
    res.json(newPost);
  } catch (e) {
    console.log(e);
    next(e);
  }
}); // POST /api/post
router.post("/images", (req, res) => {});

module.exports = router;
