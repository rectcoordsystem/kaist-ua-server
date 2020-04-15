const models = require("../../database/models");
const Router = require("koa-router");
const banners = new Router();

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

banners.get("/", async (ctx) => {
  await models.Banners.findAll()
    .then((banners) => {
      ctx.body = { banners };
    })
    .catch((err) => {
      ctx.body = `error: ${err}`;
    });
});

banners.post("/", printInfo);
banners.delete("/", printInfo);
banners.put("/", printInfo);

module.exports = banners;
