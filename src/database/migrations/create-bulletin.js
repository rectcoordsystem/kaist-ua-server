"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "bulletin",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: "bulletin",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("bulletin");
  },
};
