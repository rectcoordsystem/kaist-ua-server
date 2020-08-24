'use strict';
module.exports = (sequelize, DataTypes) => {
    const payment = sequelize.define(
        'payment',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            std_no: DataTypes.STRING,
            year: DataTypes.INTEGER,
            semester: DataTypes.STRING

        },
        {
            underscored: true,
            freezeTableName: true,
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        },
    );
    payment.associate = function (models) {
        // associations can be defined here
    };
    return payment;
};
