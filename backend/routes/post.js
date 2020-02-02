const express = require("express");
const multer = require("multer");
const path = require("path");

const db = require("../models");
const { isLoggedIn } = require("./middleware");

const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g); //한강 파이팅 #멋져 #잘생김 음하하 -> 멋져, 잘생김을 뽑아낸다
    //문자열을 뽑아낼때 정규표현식을 사용한다
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }
          })
        )
      );
      console.log(result);
      await newPost.addHashtags(result.map(r => r[0]));
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{ model: db.User, attributes: ["id", "nickname"] }]
    });
    res.json(fullPost);
  } catch (e) {
    console.log(e);
    next(e);
  }
}); // POST /api/post
router.post("/images", (req, res) => {});

module.exports = router;
