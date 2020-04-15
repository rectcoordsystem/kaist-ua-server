let postId = 1;
const posts = [];

/**
 * POST /posts
 * {title, author, content, views}
 */
exports.write = (ctx) => {
  const { title, author, content, views } = ctx.request.body;
  const post = {
    id: postId,
    title: title,
    author: author,
    content: content,
    views: views,
  };
  posts.push(post);
  ctx.body = post;
};

/**
 * GET /posts
 */

exports.list = (ctx) => {
  ctx.body = posts;
};

/**
 * GET /posts/:id
 */

exports.read = (ctx) => {
  const { id } = ctx.params;
  const post = posts.find((post) => post.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: "포스트가 존재하지 않습니다.",
    };
    return;
  }
  ctx.body = post;
};

/**
 * DELETE /posts/:id
 */

exports.remove = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((post) => post.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "포스트가 존재하지 않습니다.",
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204;
};

/**
 * PATCH /posts/:id
 * {title, (author), content, (views)}
 */
exports.update = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((post) => post.id.toString === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "포스트가 존재하지 않습니다.",
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
