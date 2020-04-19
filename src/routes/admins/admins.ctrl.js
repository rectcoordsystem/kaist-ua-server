const models = require("../../database/models");
const crypto = require("crypto");

var genRandomString = function (length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

/**
 * GET /admin
 * {email, password}
 */
exports.login = async (ctx) => {
  const { email, password } = ctx.request.body;
  const res = await models.admin.findOne({ email });
  const hash = crypto.createHmac("sha512", res.salt);
  hash.update(password);
  const value = hash.digest("hex");
  if (value === res.password) {
    ctx.body = {
      email: res.email,
      accessToken: res.accessToken,
    };
  }
};

/**
 *  POST /admin
 *  {email, password}
 */

exports.register = async (ctx) => {
  const { email, password } = ctx.request.body;
  const res = await models.admin.findOne({ email });
  if (res) return;
  var salt = genRandomString(16);
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  const value = hash.digest("hex");
  ctx.body = await models.admin.create({ email, salt, password: value });
};
