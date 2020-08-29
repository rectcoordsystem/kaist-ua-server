"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      author: DataTypes.TEXT,
      korTitle: DataTypes.TEXT,
      engTitle: DataTypes.TEXT,
      korContent: DataTypes.TEXT,
      engContent: DataTypes.TEXT,
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isActive: DataTypes.BOOLEAN,
      isNew: {
        type: DataTypes.VIRTUAL,
        get: function () {
          const createdAt = this.createdAt;
          const createdAtDate = new Date(createdAt);
          const now = new Date();
          return createdAtDate.getMinutes() > now.getMinutes() - 60 * 24;
        },
      },
    },
    {
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Post.associate = function (models) {
    models.Post.belongsTo(models.Board, { foreignKey: "boardId" });
  };

  return Post;
};
