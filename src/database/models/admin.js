"use strict";
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    "admin",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      accessToken: DataTypes.UUID,
      salt: DataTypes.STRING,
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "admin",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  admin.associate = function (models) {
    // associations can be defined here
  };
  return admin;
};
