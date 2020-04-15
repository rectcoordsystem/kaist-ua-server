"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "banner",
      [
        {
          url: "http://bitly.kr/TDZyC8p2",
          idx: 0,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("banner", null, {});
  },
};
