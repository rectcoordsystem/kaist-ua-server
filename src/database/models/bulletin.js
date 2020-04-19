"use strict";
module.exports = (sequelize, DataTypes) => {
  const bulletin = sequelize.define(
    "bulletin",
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "bulletin",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  bulletin.associate = function (models) {
    models.bulletin.hasMany(models.post);
  };

  return bulletin;
};
