const models = require("../../database/models");
const crypto = require("crypto");

var genRandomString = function (length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

/** @swagger
 *  parameters:
 *   adminAuth@header:
 *     name: x-token
 *     in: header
 *     description: access token provided to admin
 *     required: true
 *     type: UUID
 */

/** @swagger
 *  /admins/login:
 *    post:
 *      summary: obtain access token for admin
 *      tags: [Admin]
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: admin
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *          required: true
 */
exports.login = async (ctx) => {
  const { email, password } = ctx.request.body;
  const res = await models.admin.findOne({ where: { email } });
  if (!res) {
    ctx.status = 404;
    ctx.body = {
      message: "로그인 실패!",
    };
  } else {
    const hash = crypto.createHmac("sha512", res.salt);
    hash.update(password);
    const value = hash.digest("hex");
    if (value === res.password) {
      ctx.body = {
        email: res.email,
        accessToken: res.access_token,
      };
    }
  }
};

/**
 *  POST /admins/register
 *  {email, password}
 */
exports.register = async (ctx) => {
  const { email, password } = ctx.request.body;
  const res = await models.admin.findOne({ where: { email } });
  if (res) return;
  var salt = genRandomString(16);
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  const value = hash.digest("hex");
  ctx.body = await models.admin.create({ email, salt, password: value });
};
