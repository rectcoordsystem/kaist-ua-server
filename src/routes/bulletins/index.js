const Router = require("koa-router");
const bulletins = new Router();
const bulletinsCtrl = require("./bulletins.ctrl");

bulletins.post("/", bulletinsCtrl.open);
bulletins.get("/", bulletinsCtrl.list);
bulletins.delete("/:id", bulletinsCtrl.close);
bulletins.patch("/:id", bulletinsCtrl.reopen);

module.exports = bulletins;
