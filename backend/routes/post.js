const express = require("express");
const multer = require("multer");
const path = require("path");

const db = require("../models");
const { isLoggedIn } = require("./middleware");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads"); //done(서버에러, 성공했을때)
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 } //바이트단위, 갯수도 제한 가능
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
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
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
        const images = await Promise.all(
          // Promise로 동시여 여러개 DB 쿼리하는 방법임
          req.body.image.map(image => {
            return db.Image.create({ src: image });
          })
        );
        await newPost.addImages(images); // 이미지가 여러개임 시퀄라이즈가 저 매서드를 알아서 추가함
        // 이미지 주소를 따로 DB에 저장한 후, 게시글과 연결한다
      } else {
        // 이미지를 하나만 올리면 image: 주소1
        const image = await db.Image.create({ src: req.body.image });
        await newPost.addImage(image); // 이미지가 한개임
      }
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        { model: db.User, attributes: ["id", "nickname"] },
        {
          model: db.Image
        }
      ]
    });
    res.json(fullPost);
  } catch (e) {
    console.log(e);
    next(e);
  }
}); // POST /api/post
//multer는 formData는 cookieparser로 해석못하기에 쓴다.

//formDAta의 이름과 upload.array('image')이름이 같아야 한다/fields,none,single등의 옵션이 있다.
router.post("/images", upload.array("image"), (req, res) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } }); // 댓글달려면 먼저 포스트가 있는지부터 확인
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다");
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    res.json(comments);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } }); // 댓글달려면 먼저 포스트가 있는지부터 확인
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다");
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content
    });
    await post.addComment(newComment.id); // post랑 comment랑 이어준다
    const comment = await db.Comment.findOne({
      where: { id: newComment.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    return res.json(comment);
  } catch (e) {
    console.log(e);
    return next(e);
  }
});

router.post("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    // 게시글 좋아요, 안좋아요 누를때에는 반드시 먼저 그 글이 있는지 확인해야 한다
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다");
    }
    await post.addLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.log(e);
    next(e);
  }
});
router.delete("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    // 게시글 좋아요, 안좋아요 누를때에는 반드시 먼저 그 글이 있는지 확인해야 한다
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다");
    }
    await post.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
