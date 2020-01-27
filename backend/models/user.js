module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", //테이블명은 users 자동으로 소문자로 바뀐다 이걸쓰기 싫으면 tableName: 'Users'로 만들어야 한ㄷ
    {
      nickname: {
        type: DataTypes.STRING(20), // 20글자 이하
        allowNull: false // 필수
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true // 고유한값
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci" // 2개 적어줘야 한글이 저장 된다
    }
  );
  User.associate = db => {
    db.User.hasMany(db.Post, { as: "Posts" });
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      // 같은 곳에서 발생하는 관계이기에 2번 적어준다. 하지만 구별하기 위해 as로 구별한다
      through: "Follow",
      as: "Followers",
      foreignKey: "followeingId"
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId"
    });
  };

  return User;
};
