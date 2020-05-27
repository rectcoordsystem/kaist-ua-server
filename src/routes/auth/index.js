const Router = require("koa-router");
const auth = new Router();
const authCtrl = require("./auth.ctrl");

auth.get("/login", authCtrl.login);

module.exports = auth;
