"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Banners",
      [
        {
          url: "http://bitly.kr/TDZyC8p2",
          idx: 0,
          createdAt: "2020-04-06",
          updatedAt: "2020-04-06",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Banners", null, {});
  },
};
