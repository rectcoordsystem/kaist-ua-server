const Router = require("koa-router");
const banners = new Router();
const bannersCtrl = require("./banners.ctrl");

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

banners.get("/", bannersCtrl.list);
banners.post("/", bannersCtrl.upload);
banners.delete("/:id", bannersCtrl.remove);

module.exports = banners;
