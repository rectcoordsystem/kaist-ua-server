"use strict";
module.exports = (sequelize, DataTypes) => {
  const bulletin = sequelize.define(
    "bulletin",
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
      description: {
        type: DataTypes.TEXT,
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

  bulletin.associate = function (models) {
    models.bulletin.hasMany(models.post);
  };

  return bulletin;
};
