'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ku_std_no: DataTypes.STRING,
      kaist_uid: DataTypes.STRING,
      ku_employee_number: DataTypes.STRING,
      displayname: DataTypes.STRING,
      ku_acad_name: DataTypes.STRING,
      ku_kname: DataTypes.STRING,
      user_id: DataTypes.STRING,
      access_token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
