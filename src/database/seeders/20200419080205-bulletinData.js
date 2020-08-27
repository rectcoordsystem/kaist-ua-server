'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'bulletin',
      [
        {
          id: 1,
          title: '공지사항',
          description: '공지사항 게시판 입니다~!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: '학생복지',
          description: '학생복지/제휴 게시판 입니다~!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bulletin', null, {});
  },
};
