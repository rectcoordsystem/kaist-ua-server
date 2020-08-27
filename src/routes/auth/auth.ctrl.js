const models = require("../../database/models");
const { generateToken } = require("./generateToken");
const e = require("cors");

exports.signup = async (ctx) => {
  const { USER_INFO, state } = JSON.parse(ctx.request.body.result).dataMap;
  var record = await models.user.findOne({ where: USER_INFO });
  if (record || state === process.env.REGISTER_KEY) {
    if (!record) {
      record = await models.user.create(USER_INFO);
    } else {
    }
    const token = await generateToken({ id: record.id });
    ctx.cookies.set("kaistua_web_access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      overwrite: true,
    });
    ctx.redirect(`${process.env.WEB_FRONTEND}/web/main`);
  } else {
    ctx.redirect(`${process.env.WEB_FRONTEND}/web/auth/agreement/login`);
  }
};

exports.logout = async (ctx) => {
  ctx.cookies.set("kaistua_web_access_token", "", { overwrite: true });
  ctx.response.status = 200;
};

exports.check = async (ctx) => {
  if (!ctx.request.user) {
    ctx.status = 200;
    ctx.body = {
      message: "Unauthorized user",
      auth: false,
    };
  } else {
    const { id } = ctx.request.user;
    const user = await models.user.findOne({ where: { id } });
    if (!user) {
      ctx.status = 200;
      ctx.body = {
        message: "Unauthorized user",
        auth: false,
      };
    } else {
      ctx.body = {
        auth: user ? "user" : false,
        name: user.ku_kname || user.displayname,
      };
    }
  }
};
