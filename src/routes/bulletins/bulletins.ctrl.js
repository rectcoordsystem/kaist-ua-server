const models = require("../../database/models");

/**
 * POST /bulletins
 * {title, description}
 */

exports.open = async (ctx) => {
  const { title, description } = ctx.request.body;
  const bulletin = {
    title: title,
    description: description,
  };
  await models.bulletin
    .create(bulletin)
    .then((res) => {
      console.log("게시판 오픈 성공!");
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * GET /bulletins
 */

exports.list = async (ctx) => {
  await models.bulletin
    .findAll()
    .then((res) => {
      const bulletins = res;
      ctx.body = bulletins;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * DELETE /bulletins/:id
 */

exports.close = async (ctx) => {
  const { id } = ctx.params;

  await models.bulletin
    .destroy({
      where: { id: id },
    })
    .then((res) => {
      if (!res) {
        ctx.status = 404;
        ctx.body = {
          message: "게시판이 존재하지 않습니다!",
        };
      } else {
        console.log("게시판 삭제 성공!");
        ctx.status = 204;
      }
    });
};

/**
 * PATCH /bulletins/:id
 * {title, description}
 */
exports.reopen = async (ctx) => {
  const { id } = ctx.params;
  const { title, description } = ctx.request.body;
  const bulletin = {
    title: title,
    description: description,
  };

  await models.bulletin
    .update(bulletin, {
      where: { id: id },
    })
    .then((res) => {
      ctx.body = bulletin;
      console.log("게시판 업데이트 성공!");
    })
    .catch((err) => {
      console.log(err);
    });
};
