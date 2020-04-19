const Router = require("koa-router");
const admins = new Router();
const adminsCtrl = require("./admins.ctrl");

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

admins.get("/", adminsCtrl.login);
admins.post("/", adminsCtrl.post);

module.exports = admins;
