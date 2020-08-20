const models = require('../../database/models');
const Op = require('sequelize').Op;

/**
 * POST /posts
 * {title, author, content, views}
 */
exports.write = async (ctx) => {
  const { title, author, content, bulletinId } = ctx.request.body;
  const post = {
    title: title,
    author: author,
    content: content,
    bulletin_id: parseInt(bulletinId),
  };
  console.log(post);
  await models.post
    .create(post)
    .then((res) => {
      console.log('포스트 업로드 성공!');
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * GET /posts
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

  await models.post
    .findAll({
      order: [['created_at', 'DESC']],
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

  await models.post
    .count({
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

/**
 * GET /posts/:id
 */

exports.read = async (ctx) => {
  const { id } = ctx.params;

  await models.post
    .findOne({
      where: { id },
    })
    .then((res) => {
      ctx.body = res;

      models.post.update({ views: res.views + 1 }, { where: { id } });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * DELETE /posts/:id
 */

exports.remove = async (ctx) => {
  const { id } = ctx.params;

  await models.post
    .destroy({
      where: { id: id },
    })
    .then((res) => {
      if (!res) {
        ctx.status = 404;
        ctx.body = {
          message: '포스트가 존재하지 않습니다.',
        };
      } else {
        console.log('포스트 삭제 성공!');
        ctx.status = 204;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * PATCH /posts/:id
 * {title, (author), content, (views)}
 */
exports.update = async (ctx) => {
  const { id } = ctx.params;
  const { title, author, content, views } = ctx.request.body;
  const post = {
    title: title,
    author: author,
    content: content,
    views: views,
  };

  await models.post
    .update(post, {
      where: { id: id },
    })
    .then((res) => {
      ctx.body = post;
      console.log('포스트 업데이트 성공!');
    })
    .catch((err) => {
      console.log(err);
    });
};
