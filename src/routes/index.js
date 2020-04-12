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

module.exports = router;
