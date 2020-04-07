const Sequelize = require("sequelize");
const sequelize = require("../database/db");

module.exports = sequelize.define(
  "admin",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    access_token: {
      type: Sequelize.UUID
    }
  },
  {
    paranoid: true
  }
);
