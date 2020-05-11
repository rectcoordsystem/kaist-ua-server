"use strict";
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    "admin",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      access_token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      salt: DataTypes.STRING,
    },
    {
      underscored: true,
      freezeTableName: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  admin.associate = function (models) {
    // associations can be defined here
  };
  return admin;
};
