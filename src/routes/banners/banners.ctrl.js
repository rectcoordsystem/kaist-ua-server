const models = require("../../database/models");

/**
 * POST /banners
 * {url}
 */
exports.upload = async (ctx) => {
  const { url } = ctx.request.body;
  const banner = {
    url: url,
  };
  await models.banner
    .create(banner)
    .then((res) => {
      console.log("배너 추가 성공!");
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 *  GET /banners
 */

exports.list = async (ctx) => {
  await models.banner
    .findAll()
    .then((res) => {
      const banners = res;
      ctx.body = banners;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * DELETE /banners/:id
 */

exports.remove = async (ctx) => {
  const { id } = ctx.params;

  await models.banner
    .destroy({
      where: { id: id },
    })
    .then((res) => {
      //number
      if (!res) {
        ctx.status = 404;
        ctx.body = {
          message: "배너가 존재하지 않습니다.",
        };
      } else {
        console.log("배너 삭제 성공!");
        ctx.status = 204;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
