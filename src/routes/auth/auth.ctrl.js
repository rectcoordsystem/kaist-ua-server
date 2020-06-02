const models = require("../../database/models");
const SSOClient = require("../../utils/sso");

exports.login = async (ctx) => {
  const { url, state } = SSOClient.getLoginParams();
  console.log(ctx.request);

  ctx.request.state = state;
  ctx.redirect(url);

  console.log(ctx);
};

exports.signUp = async (ctx) => {
  console.log(ctx.request);
};
