const models = require("../../database/models");

/** @swagger
 *  /banners:
 *    post:
 *      summary: upload url to banner image and hyperlink
 *      tags: [Banners]
 *      parameters:
 *        - $ref: "#/parameters/adminAuth@header"
 *        - in: body
 *          name: banner
 *          schema:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *              link:
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
 *              url:
 *                type: string
 *              link:
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
exports.upload = async (ctx) => {
  const { url, link } = ctx.request.body;
  const banner = {
    url: url,
    link: link,
  };
  await models.banner
    .create(banner)
    .then((res) => {
      console.log("배너 추가 성공!");
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/** @swagger
 *  /banners:
 *    get:
 *      summary: obtain all banners
 *      tags: [Banners]
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  format: uuid
 *                url:
 *                  type: string
 *                link:
 *                  type: string
 *                updated_at:
 *                  type: string
 *                  format: date-time
 *                created_at:
 *                  type: string
 *                  format: date-time
 *                deleted_at:
 *                  type: string
 *                  format: date-time
 *                  nullable: true
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
exports.list = async (ctx) => {
  await models.banner
    .findAll()
    .then((res) => {
      const banners = res;
      ctx.body = banners;
    })
    .catch((err) => {
      console.log(err);
    });
};

/** @swagger
 *  /banners/{id}:
 *    delete:
 *      summary: delete banner by ID
 *      tags: [Banners]
 *      parameters:
 *        - $ref: "#/parameters/adminAuth@header"
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *        204:
 *          description: No Content (successfully removed)
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found (failed to remove)
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 배너가 존재하지 않습니다.
 *        500:
 *          description: Internal Server Error
 */
exports.remove = async (ctx) => {
  const { id } = ctx.params;

  await models.banner
    .destroy({
      where: { id: id },
    })
    .then((res) => {
      //number
      if (!res) {
        ctx.status = 404;
        ctx.body = {
          message: "배너가 존재하지 않습니다.",
        };
      } else {
        console.log("배너 삭제 성공!");
        ctx.status = 204;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
