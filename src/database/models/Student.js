"use strict";
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      studentNumber: DataTypes.INTEGER,
      kaistUid: DataTypes.STRING,
      korName: DataTypes.STRING,
      engName: DataTypes.STRING,
      affiliation: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Student.associate = function (models) {
    // associations can be defined here
    Student.hasMany(models.CancelRequest, {
      targetKey: "studentNumber",
      foreignKey: "studentNumber",
    });
    Student.hasMany(models.Payment);
  };
  return Student;
};
