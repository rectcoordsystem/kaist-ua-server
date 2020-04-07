const Sequelize = require("sequelize");
const sequelize = new Sequelize("kaist_ua_db", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
