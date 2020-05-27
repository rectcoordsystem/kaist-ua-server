const models = require("../../database/models");
const SSOClient = require("../../utils/sso");

exports.login = async (ctx) => {
  const { url, state } = SSOClient.getLoginParams();

  ctx.request.state = state;
  ctx.redirect(url);

  console.log(ctx);
};
