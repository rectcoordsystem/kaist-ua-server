"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "banner",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        url: {
          type: Sequelize.STRING,
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
        tableName: "banner",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("banner");
  },
};
