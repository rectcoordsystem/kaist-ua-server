"use strict";
module.exports = (sequelize, DataTypes) => {
  const banner = sequelize.define(
    "banner",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      url: DataTypes.STRING,
    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  banner.associate = function (models) {
    // associations can be defined here
  };
  return banner;
};
