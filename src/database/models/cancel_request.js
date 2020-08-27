"use strict";
module.exports = (sequelize, DataTypes) => {
    const cancel_request = sequelize.define(
        "cancel_request",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            ku_std_no: DataTypes.STRING,
            displayname: DataTypes.STRING,
            ku_kname: DataTypes.STRING,
        },
        {
            underscored: true,
            freezeTableName: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
    cancel_request.associate = function (models) {
        // associations can be defined here
        models.cancel_request.belongsTo(models.user, {
            foreignKey: "id"
        })
    };
    return cancel_request;
};
