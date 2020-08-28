const models = require("../../database/models");
const Op = require("sequelize").Op;

/**
 * POST /cancelRequest
 * { year, semester }
 */
exports.post = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const { id } = ctx.request.user;
  const student = await models.Student.findOne({
    where: { id },
  });
  ctx.assert(student, 401);
  const { year, semester } = ctx.request.body;
  const { studentNumber, korName, engName } = student;
  const res = await models.CancelRequest.create({
    studentNumber,
    korName,
    engName,
    year,
    semester,
  });
  ctx.assert(res, 400);
};

/**
 * GET /cancelRequest/admin
 */
exports.getAll = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const { id } = ctx.request.user;
  const admin = await models.Admin.findOne({
    where: { id },
  });
  ctx.assert(admin, 401);
  const res = await models.CancelRequest.findAll({
    order: [["ku_std_no", "ASC"]],
  });
  ctx.assert(res, 404);
  ctx.body = res;
};

/**
 * GET /cancelRequest
 */

exports.getOne = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const { id } = ctx.request.user;
  const student = await models.Student.findOne({
    where: { id },
    include: models.CancelRequest,
  });
  ctx.assert(student, 401);

  if (student.CancelRequest) {
    ctx.body = { exists: true };
  } else {
    ctx.body = { exists: true };
  }
};

/**
 * DELETE /cancelRequest
 */

exports.delete = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const { id } = ctx.request.user;
  const { year, semester } = ctx.request.params;
  const student = await models.Student.findOne({
    where: { id },
    include: { model: models.CancelRequest, where: { year, semester } },
  });
  ctx.assert(student, 401);
  ctx.body = student.CancelRequests[0].destroy();
};
