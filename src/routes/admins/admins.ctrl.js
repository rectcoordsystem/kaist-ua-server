const models = require("../../database/models");

/**
 * POST /login
 * {url}
 */
exports.upload = async (ctx) => {
  const { url } = ctx.request.body;
  const banner = {
    url: url,
  };
  await models.Banners.create(banner)
    .then((res) => {
      console.log("배너 추가 성공!");
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 *  POST /register/email
 */

exports.list = async (ctx) => {
  await models.Banners.findAll()
    .then((res) => {
      const banners = res;
      ctx.body = banners;
    })
    .catch((err) => {
      console.log(err);
    });
};
