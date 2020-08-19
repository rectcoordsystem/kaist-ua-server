const models = require("../../database/models");
const crypto = require("crypto");
const { access } = require("fs");

var genRandomString = function (length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

/** @swagger
 *  parameters:
 *    adminAuth@header:
 *      name: x-token
 *      in: header
 *      description: access token provided to admin
 *      required: true
 *      type: string
 *      responses:
 *        200:
 *          description: Success
 *        204:
 *          description: No Content
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
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
 *                format: email
 *              password:
 *                type: string
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              accessToken:
 *                type: string
 *                format: uuid
 *        204:
 *          description: No Content
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found (Failed to login)
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 로그인 실패!
 *        500:
 *          description: Internal Server Error
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

/** @swagger
 *  /admins/check:
 *    get:
 *      summary: return whether access_token is admin's access_token
 *      tags: [Admin]
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: query
 *          name: access_token
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            properties:
 *              access:
 *                type: boolean
 *        204:
 *          description: No Content
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
exports.check = async (ctx) => {
  const url = new URLSearchParams(ctx.url.split("?")[1]);
  const res = await models.admin.findOne({
    where: { access_token: url.get("access_token") },
  });
  if (!res) {
    ctx.body = {
      access: false,
    };
  } else {
    ctx.body = {
      access: true,
    };
  }
};

/** @swagger
 *  /admins/register:
 *    post:
 *      summary: add admin account
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
 *                format: email
 *              password:
 *                type: string
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                format: uuid
 *              access_token:
 *                type: string
 *                format: uuid
 *              email:
 *                type: string
 *                format: email
 *              salt:
 *                type: string
 *              password:
 *                type: string
 *              updated_at:
 *                type: string
 *                format: date-time
 *              created_at:
 *                type: string
 *                format: date-time
 *        204:
 *          description: No Content
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
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
