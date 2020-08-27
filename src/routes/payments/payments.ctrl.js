const models = require("../../database/models");
const Op = require("sequelize").Op;

exports.write = async (ctx) => {
  const { ku_std_no_list, year, semester } = ctx.request.body;
  const bulkData = [];
  ku_std_no_list.map((id) => {
    bulkData.push({
      ku_std_no: id,
      year,
      semester,
    });
  });
  const res = await models.payment.bulkCreate(bulkData);
  if (res) {
    ctx.response.body = bulkData.length;
  }
};

exports.list = async (ctx) => {
  if (ctx.request.user) {
    const { id } = ctx.request.user;
    const user = await models.user.findOne({ where: { id } });
    console.log(user.ku_std_no);
    const res = await models.payment.findAll({
      where: { ku_std_no: user.ku_std_no },
    });
    if (res) {
      ctx.body = { payments: res };
    } else {
      ctx.body = { payments: [] };
    }
  } else {
    ctx.body = { payments: [] };
  }
};
