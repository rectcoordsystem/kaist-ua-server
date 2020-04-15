const models = require("../../database/models");

/**
 * POST /posts
 * {title, author, content, views}
 */
exports.write = async (ctx) => {
  const { title, author, content, views } = ctx.request.body;
  const post = {
    title: title,
    author: author,
    content: content,
    views: views,
  };
  await models.Posts.create(post)
    .then((res) => {
      console.log("포스트 업로드 성공!");
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
  await models.Posts.findAll()
    .then((res) => {
      ctx.body = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * GET /posts/:id
 */

exports.read = async (ctx) => {
  const { id } = ctx.params;

  await models.Posts.findOne({
    where: { id: id },
  })
    .then((res) => {
      ctx.body = res;
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

  await models.Posts.destroy({
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

  await models.Posts.update(post, {
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
