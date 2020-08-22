const models = require('../../database/models');


/** @swagger
 *  /bulletins:
 *    post:
 *      summary: open bulletin
 *      tags: [Bulletins]
 *      parameters:
 *        - $ref: "#/parameters/adminAuth@header"
 *        - in: body
 *          name: bulletin
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              title:
 *                type: string
 *              description:
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
exports.open = async (ctx) => {
  const { title, description } = ctx.request.body;
  const bulletin = {
    title: title,
    description: description,
  };
  await models.bulletin
    .create(bulletin)
    .then((res) => {
      console.log('게시판 오픈 성공!');
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/** @swagger
 *  /bulletins:
 *    get:
 *      summary: obtain all bulletins
 *      tags: [Bulletins]
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                created_at:
 *                  type: string
 *                  format: date-time
 *                updated_at:
 *                  type: string
 *                  format: date-time
 *                deleted_at:
 *                  type: string
 *                  nullable: true
 *                  format: date-time
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
  await models.bulletin
    .findAll()
    .then((res) => {
      const bulletins = res;
      ctx.body = bulletins;
    })
    .catch((err) => {
      console.log(err);
    });
};

/** @swagger
 *  /bulletins/{id}:
 *    delete:
 *      summary: delete bulletin by ID
 *      tags: [Bulletins]
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
 *          description: Not Found (bulletin doesn't exist)
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 게시판이 존재하지 않습니다!
 *        500:
 *          description: Internal Server Error
 */
exports.close = async (ctx) => {
  const { id } = ctx.params;

  await models.bulletin
    .destroy({
      where: { id: id },
    })
    .then((res) => {
      if (!res) {
        ctx.status = 404;
        ctx.body = {
          message: '게시판이 존재하지 않습니다!',
        };
      } else {
        console.log('게시판 삭제 성공!');
        ctx.status = 204;
      }
    });
};

/** @swagger
 *  /bulletins/{id}:
 *    patch:
 *      summary: update title or description of bulletin
 *      tags: [Bulletins]
 *      parameters:
 *        - $ref: "#/parameters/adminAuth@header"
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *        - in: body
 *          name: bulletin
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
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
exports.reopen = async (ctx) => {
  const { id } = ctx.params;
  const { title, description } = ctx.request.body;
  const bulletin = {
    title: title,
    description: description,
  };

  await models.bulletin
    .update(bulletin, {
      where: { id: id },
    })
    .then((res) => {
      ctx.body = bulletin;
      console.log('게시판 업데이트 성공!');
    })
    .catch((err) => {
      console.log(err);
    });
};
