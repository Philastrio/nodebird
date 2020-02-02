const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) } // req.params.name 이자체는 주소창에서 이상하게 보이기에 decode해야 한다/한글이나 특수문자가 들어가기에 이렇게 함
        },
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    res.json(posts);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
