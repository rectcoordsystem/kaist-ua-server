"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Posts",
      [
        {
          postId: 123,
          createdAt: "2020-02-03",
          updatedAt: "2020-02-03"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  }
};
