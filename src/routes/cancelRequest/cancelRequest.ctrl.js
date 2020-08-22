const models = require("../../database/models");
const Op = require("sequelize").Op;

/**
 * POST /cancelRequest
 * {id}
 */
exports.write = async (ctx) => {
  const { id } = ctx.request.body;
  const res = await models.user.findOne({
    where: { id },
  })
  if (!res) ctx.body = "No user found";
  console.log(res.ku_std_no)
  const { ku_std_no, displayname, ku_kname } = res;
  await models.cancel_request
    .create({ id, ku_std_no, displayname, ku_kname })
    .then((res) => {
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * GET /cancelRequest
 */

exports.list = async (ctx) => {
  await models.cancel_request
    .findAll({
      order: [["ku_std_no", "ASC"]],
    })
    .then((res) => {
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * GET /cancelRequest/:id
 */

exports.read = async (ctx) => {
  const { id } = ctx.params;

  await models.cancel_request
    .findOne({
      where: { id },
    })
    .then((res) => {
      if (!res)
        ctx.body = { exists: false };
      else
        ctx.body = { exists: true };
    })
    .catch((err) => {
      console.log(err)
      ctx.body = { exists: false };
    });
};

/**
 * DELETE /cancelRequest/:id
 */

exports.remove = async (ctx) => {
  const { id } = ctx.params;

  await models.cancel_request
    .destroy({
      where: { id: id },
    })
    .then((res) => {
      if (!res) {
        ctx.status = 404;
        ctx.body = {
          message: "id가 존재하지 않습니다.",
        };
      } else {
        console.log("cancel request 삭제 성공!");
        ctx.status = 204;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};