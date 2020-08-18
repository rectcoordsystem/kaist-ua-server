const Router = require("koa-router");
const bulletins = new Router();
const passport = require("koa-passport");
const bulletinsCtrl = require("./bulletins.ctrl");

bulletins.post(
  "/",
  passport.authenticate("token", { session: false }),
  bulletinsCtrl.open
);
bulletins.get("/", bulletinsCtrl.list);
bulletins.delete(
  "/:id",
  passport.authenticate("token", { session: false }),
  bulletinsCtrl.close
);
bulletins.patch(
  "/:id",
  passport.authenticate("token", { session: false }),
  bulletinsCtrl.reopen
);

module.exports = bulletins;
