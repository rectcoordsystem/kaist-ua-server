const models = require("../../database/models");
const Op = require("sequelize").Op;

exports.write = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const { id } = ctx.request.user;
  const student = await models.Student.findOne({
    where: { id },
  });
  ctx.assert(student, 401);
  const petition = ctx.request.body;
  const res = await models.Petition.create(petition);
  ctx.assert(res, 400);
  ctx.status = 204;
};

exports.list = async (ctx) => {
  const { page } = ctx.request.query;
  const PAGE_SIZE = 15;

  ctx.assert(page > 0, 400);

  const offset = PAGE_SIZE * (page - 1);

  const petitions = await models.Petition.findAll({
    order: [["createdAt", "DESC"]],
    offset,
    limit: PAGE_SIZE,
    raw: false,
    include: models.Student,
  });

  const petitionCount = await models.Petition.count();

  const lastPage = Math.ceil(petitionCount / PAGE_SIZE);

  ctx.body = { petitions, lastPage };
};

exports.read = async (ctx) => {
  const { id } = ctx.params;

  const petitions = await models.Petition.findOne({
    where: { id },
    raw: false,
    include: models.Student,
  });

  ctx.body = petitions;
};

exports.vote = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const studentId = ctx.request.user.id;
  const student = await models.Student.findOne({
    where: { id: studentId },
  });
  ctx.assert(student, 401);

  const { id } = ctx.params;

  const petition = await models.Petition.findOne({
    where: { id },
  });

  petition.addStudent(student);

  const result = await Petition.findOne({
    where: { id },
    include: models.Student,
  });

  ctx.body = petition;
};
