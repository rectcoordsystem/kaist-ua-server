const models = require("../../database/models");
const { generateToken } = require("./generateToken");
const e = require("cors");

exports.signup = async (ctx) => {
  const { USER_INFO, state } = JSON.parse(ctx.request.body.result).dataMap;
  var record = await models.user.findOne({ where: USER_INFO });
  if (record || state === process.env.REGISTER_KEY) {
    if (!record) {
      console.log("REGISTER");
      record = await models.user.create(USER_INFO);
    } else {
      console.log("LOGIN");
    }
    const token = await generateToken({ id: record.id });
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      overwrite: true,
    });
    ctx.redirect(`${process.env.WEB_FRONTEND}/web/main`);
  } else {
    console.log("AGREEMENT");
    ctx.redirect(`${process.env.WEB_FRONTEND}/web/auth/agreement/login`);
  }
};

exports.logout = async (ctx) => {
  ctx.cookies.set("access_token", "", { overwrite: true });
  ctx.response.status = 200;
};

exports.checkUser = async (ctx) => {
  const { id } = ctx.request.user;
  const user = await models.user.findOne({ where: { id } });
  ctx.response.body = { auth: user ? "user" : false };
};
