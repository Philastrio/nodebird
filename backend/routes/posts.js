const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  //GET /api/posts
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        },
        { model: db.Image },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"]
            },
            {
              model: db.Image
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]] //  조건을 추가로 더 줄 수 있어서 2차원 배열이다. 1순위로 저걸로 하고 ['updatedAt','ASC']로 2순위할수 있따
    });
    res.json(posts);
    //기본적으로 toJSON은 안붙여도 된다. 하지만 가끔 예외가 있다
    //db에서 가져오는 것을 변형할때는 붙여야 한다
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
