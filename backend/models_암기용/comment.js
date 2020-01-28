module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT, //긴글
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
      colloate: "utf8mb4_general_ci"
    }
  );
  Comment.associate = db => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
