const models = require('../../database/models');

/** @swagger
 *  /payment:
 *    post:
 *      summary: add payment record
 *      tags: [Payment]
 *      parameters:
 *        - $ref: "#/parameters/adminAuth@header"
 *        - in: body
 *          name: payment
 *          schema:
 *            type: object
 *            properties:
 *              std_no:
 *                type: string
 *              year:
 *                type: integer
 *              semester:
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
 *              std_no:
 *                type: string
 *              year:
 *                type: integer
 *              semester:
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

exports.add = async (ctx) => {
    const { std_no, year, semester } = ctx.request.body;
    const payment = {
        std_no: std_no,
        year: year,
        semester: semester
    };
    await models.payment
        .create(payment)
        .then((res) => {
            ctx.body = res;
        })
        .catch((err) => {
            console.log(err);
        });
};

/** @swagger
 *  /payment:
 *    get:
 *      summary: obtain payment list by student number
 *      tags: [Payment]
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: query
 *          name: std_no
 *          schema:
 *            type: string
 *          required: true
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
 *                std_no:
 *                  type: string
 *                year:
 *                  type: integer
 *                semester:
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
    const { std_no } = ctx.request.query;

    var where = { std_no: std_no };
    if (!std_no) {
        ctx.status = 400;
        return;
    }

    await models.payment
        .findAll({
            order: [['year', 'DESC'], ['semester', 'ASC']],
            where: where
        })
        .then((res) => {
            const list = res;
            ctx.body = list;
        })
        .catch((err) => {
            console.log(err);
        });
};

/** @swagger
 *  /payment/{id}:
 *    delete:
 *      summary: delete payment record by id
 *      tags: [Payment]
 *      produces:
 *        - application/json
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
 *          description: Not Found (record doesn't exist)
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 기록이 없습니다!
 *        500:
 *          description: Internal Server Error
 */

exports.remove = async (ctx) => {
    const { id } = ctx.params;
    console.log(ctx.params);
    await models.payment
        .destroy({
            where: { id: id },
        })
        .then((res) => {
            if (!res) {
                ctx.status = 404;
                ctx.body = {
                    message: '기록이 없습니다!',
                };
            } else {
                ctx.status = 204;
            }
        });
};