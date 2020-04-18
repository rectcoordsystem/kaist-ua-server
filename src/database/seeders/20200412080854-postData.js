"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "post",
      [
        {
          title: "[제휴] <욱카>, 학기당 500회 사용 가능",
          author: "복지국",
          content: "욱카 이용권은 월 3000원에 판매되고 있습니다.",
          views: 483,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("post", null, {});
  },
};
