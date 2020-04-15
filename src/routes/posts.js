const models = require("../database/models");
const Router = require("koa-router");
const posts = new Router();

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

posts.post("/post", async (req, res) => {
  await models.Posts.create({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    views: req.content.views,
  })
    .then((result) => {
      console.log("New Post Created");
    })
    .catch((err) => {
      console.log(err);
    });
});

posts.get("/", printInfo);
posts.put("/", printInfo);
posts.delete("/", printInfo);

module.exports = posts;
