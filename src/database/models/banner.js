'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    url: DataTypes.STRING,
    idx: DataTypes.INTEGER
  }, {});
  Banner.associate = function(models) {
    // associations can be defined here
  };
  return Banner;
};