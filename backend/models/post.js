module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      //테이블명은 posts
      content: {
        type: DataTypes.TEXT, // 매우 긴 글(글자수를 모를때 )
        allowNull: false
      }
    },
    {
      charset: "utf8mb4", // 한글+이모티콘
      collate: "utf8mb4_general_ci"
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User); // 테이블에 UserId 컬럼이 생긴다, Post는 User에 속한다는 의미/ hasMany의 반대라고 생각하면된다
    // 그래서 belongsTo가 있는 테이블에 다른 테이블의 id를 저장한다
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // Retweet 커럼이 생긴다
    db.Post.belongsToMany(db.HashTag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Post;
};
