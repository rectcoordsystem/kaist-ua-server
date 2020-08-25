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
