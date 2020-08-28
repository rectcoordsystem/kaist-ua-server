const models = require("../../database/models");
const Op = require("sequelize").Op;

/** @swagger
 *  /posts:
 *    post:
 *      summary: upload post
 *      tags: [Posts]
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: post
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              author:
 *                type: string
 *              content:
 *                type: string
 *              bulletinId:
 *                type: integer
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
 *              views:
 *                type: integer
 *              title:
 *                type: string
 *              author:
 *                type: string
 *              content:
 *                type: string
 *              bulletin_id:
 *                type: integer
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
exports.write = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const { id } = ctx.request.user;
  const admin = await models.Admin.findOne({
    where: { id },
  });
  ctx.assert(admin, 401);
  const { title, author, content, bulletinId } = ctx.request.body;
  const post = {
    title: title,
    author: author,
    content: content,
    bulletin_id: parseInt(bulletinId),
  };
  await models.Post.create(post)
    .then((res) => {
      console.log("포스트 업로드 성공!");
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/** @swagger
 *  /posts:
 *    get:
 *      summary: obtain posts by page and bulletinId
 *      description: title and author are for searching specific posts (optional)
 *      tags: [Posts]
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: string
 *          required: true
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *        - in: query
 *          name: author
 *          schema:
 *            type: string
 *        - in: query
 *          name: bulletinId
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            properties:
 *              posts:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      format: uuid
 *                    title:
 *                      type: string
 *                    author:
 *                      type: string
 *                    content:
 *                      type: string
 *                    views:
 *                      type: integer
 *                    bulletin_id:
 *                      type: integer
 *                    created_at:
 *                      type: string
 *                      format: date-time
 *                    updated_at:
 *                      type: string
 *                      format: date-time
 *                    deleted_at:
 *                      type: string
 *                      nullable: true
 *                      format: date-time
 *              lastPage:
 *                type: integer
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
  const { page, title, author, bulletinId } = ctx.request.query;
  const POST_NUM_PER_PAGE = 15;

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const offset = POST_NUM_PER_PAGE * (page - 1);

  var where = { bulletin_id: parseInt(bulletinId) };

  if (author) where.author = author;
  if (title)
    where.title = {
      [Op.like]: `%${title}%`,
    };

  var body = {};

  await models.Post.findAll({
    order: [["created_at", "DESC"]],
    offset: offset,
    limit: POST_NUM_PER_PAGE,
    where: where,
  })
    .then((res) => {
      if (!res) body.posts = res;
      body.posts = res;
    })
    .catch((err) => {
      console.log(err);
    });

  await models.Post.count({
    where: where,
  })
    .then((res) => {
      body.lastPage = Math.ceil(res / POST_NUM_PER_PAGE);
    })
    .catch((err) => {
      console.log(err);
    });

  ctx.body = body;
};

/** @swagger
 *  /posts/{id}:
 *    get:
 *      summary: obtain post by ID
 *      tags: [Posts]
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
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
 *              title:
 *                type: string
 *              author:
 *                type: string
 *              content:
 *                type: string
 *              views:
 *                type: integer
 *              bulletin_id:
 *                type: integer
 *              created_at:
 *                type: string
 *                format: date-time
 *              updated_at:
 *                type: string
 *                format: date-time
 *              deleted_at:
 *                type: string
 *                nullable: true
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
exports.read = async (ctx) => {
  const { id } = ctx.params;

  await models.Post.findOne({
    where: { id },
  })
    .then((res) => {
      ctx.body = res;

      models.Post.update({ views: res.views + 1 }, { where: { id } });
    })
    .catch((err) => {
      console.log(err);
    });
};

/** @swagger
 *  /posts/{id}:
 *    delete:
 *      summary: delete post by ID
 *      tags: [Posts]
 *      parameters:
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
 *          description: Not Found (post doesn't exist)
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: 포스트가 존재하지 않습니다.
 *        500:
 *          description: Internal Server Error
 */
exports.remove = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const adminId = ctx.request.user.id;
  const admin = await models.Admin.findOne({
    where: { id: adminId },
  });
  ctx.assert(admin, 401);
  const { id } = ctx.params;

  await models.Post.destroy({
    where: { id: id },
  })
    .then((res) => {
      if (!res) {
        ctx.status = 404;
        ctx.body = {
          message: "포스트가 존재하지 않습니다.",
        };
      } else {
        console.log("포스트 삭제 성공!");
        ctx.status = 204;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/** @swagger
 *  /posts/{id}:
 *    patch:
 *      summary: update title or content of post
 *      tags: [Posts]
 *      parameters:
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
 *              author:
 *                type: string
 *              content:
 *                type: string
 *              views:
 *                type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              author:
 *                type: string
 *              content:
 *                type: string
 *              views:
 *                type: integer
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
exports.update = async (ctx) => {
  ctx.assert(ctx.request.user, 401);
  const adminId = ctx.request.user.id;
  const admin = await models.Admin.findOne({
    where: { id: adminId },
  });
  ctx.assert(admin, 401);
  const { id } = ctx.params;
  const { title, author, content, views } = ctx.request.body;
  const post = {
    title: title,
    author: author,
    content: content,
    views: views,
  };

  await models.Post.update(post, {
    where: { id: id },
  })
    .then((res) => {
      ctx.body = post;
      console.log("포스트 업데이트 성공!");
    })
    .catch((err) => {
      console.log(err);
    });
};
