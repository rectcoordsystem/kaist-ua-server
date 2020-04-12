"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Posts",
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "post",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Post.associate = function (models) {
    // associations can be defined here
  };
  return Post;
};
