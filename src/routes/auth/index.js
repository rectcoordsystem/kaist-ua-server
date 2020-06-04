const Router = require("koa-router");
const auth = new Router();
const authCtrl = require("./auth.ctrl");

auth.get("/login", authCtrl.login);
auth.post("/signup", authCtrl.signUp);

module.exports = auth;
