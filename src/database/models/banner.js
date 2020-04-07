"use strict";
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define(
    "Banners",
    {
      url: DataTypes.STRING,
      idx: DataTypes.INTEGER,
    },
    {}
  );
  Banner.associate = function (models) {
    // associations can be defined here
  };
  return Banner;
};
