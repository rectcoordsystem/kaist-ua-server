"use strict";
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
        defaultValue: 0,
      },
      bulletinId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  post.associate = function (models) {
    models.post.belongsTo(models.bulletin, {
      foreignKey: "bulletinId",
      onDelete: "cascade",
    });
  };

  return post;
};
