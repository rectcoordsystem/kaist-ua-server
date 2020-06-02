const Router = require("koa-router");
const auth = new Router();
const authCtrl = require("./auth.ctrl");

auth.get("/login", authCtrl.login);
auth.post("/auth/signup", authCtrl.signUp);

module.exports = auth;
