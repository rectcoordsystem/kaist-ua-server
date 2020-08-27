const Router = require("koa-router");
const cancelRequest = new Router();
const cancelRequestCtrl = require("./cancelRequest.ctrl");

cancelRequest.post("/", cancelRequestCtrl.write);
cancelRequest.get("/", cancelRequestCtrl.list);
cancelRequest.get("/:id", cancelRequestCtrl.read);
cancelRequest.delete("/:id", cancelRequestCtrl.remove);

module.exports = cancelRequest;
