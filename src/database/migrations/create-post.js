"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "post",
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
        author: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        views: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        bulletinId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "bulletin",
            key: "id",
          },
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
        tableName: "post",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("post");
  },
};
