'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'post',
      [
        {
          id: 1,
          title: 'asdf',
          author: '복지국',
          content: '욱카 이용권은 월 3000원에 판매되고 있습니다.',
          views: 483,
          bulletinId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: '[제휴] <욱카>, 학기당 50022회 사용 가능',
          author: '복지국2',
          content: '욱카 이용권은 월 3000원에 판매되고 있습니다.',
          views: 483,
          bulletinId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: '[제휴] <욱카>, 학기당 500423회 사용 가능',
          author: '복지국3',
          content: '욱카 이용권은 월 3000원에 판매되고 있습니다.',
          views: 483,
          bulletinId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          title: '[제휴] <욱카>, 학기당 50032회 사용 가능',
          author: '복지국4',
          content: '욱카 이용권은 월 3000원에 판매되고 있습니다.',
          views: 483,
          bulletinId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('post', null, {});
  },
};
