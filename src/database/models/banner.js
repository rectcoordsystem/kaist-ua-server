"use strict";
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define(
    "Banners",
    {
      url: DataTypes.STRING,
      idx: DataTypes.INTEGER,
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "banner",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Banner.associate = function (models) {
    // associations can be defined here
  };
  return Banner;
};
