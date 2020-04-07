const Router = require("koa-router");
const router = new Router();
const Admin = require("../models/Admin");

router.get("/api/admin", async ctx => {
  await Admin.findAll()
    .then(admin => {
      ctx.body = admin;
    })
    .catch(err => {
      ctx.body = `error: ${err}`;
    });
});

module.exports = router;
