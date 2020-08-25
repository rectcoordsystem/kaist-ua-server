const Router = require("koa-router");
const payments = new Router();
const paymentsCtrl = require("./payments.ctrl");

payments.post("/", paymentsCtrl.write);
// payments.get("/", paymentsCtrl.list);
// payments.get("/:id", paymentsCtrl.read);

module.exports = payments;
