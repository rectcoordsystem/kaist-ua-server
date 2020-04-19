"use strict";
module.exports = (sequelize, DataTypes) => {
  const banner = sequelize.define(
    "banner",
    {
      url: DataTypes.STRING,
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "banner",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  banner.associate = function (models) {
    // associations can be defined here
  };
  return banner;
};
