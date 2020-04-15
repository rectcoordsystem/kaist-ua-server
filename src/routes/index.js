const Router = require("koa-router");
const models = require("../database/models");

const router = new Router();

router.get("/banners", async (ctx) => {
  await models.Banners.findAll()
    .then((banners) => {
      ctx.body = { banners };
    })
    .catch((err) => {
      ctx.body = `error: ${err}`;
    });
});

router.post("/post", async (req, res) => {
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

module.exports = router;
