"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Banners",
      [
        {
          url:
            "https://image.freepik.com/free-vector/flat-banners_23-2147988418.jpg",
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
