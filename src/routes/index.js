const Router = require("koa-router");

const posts = require("./posts");
const banners = require("./banners");
const bulletins = require("./bulletins");
const admins = require("./admins");
const auth = require("./auth");
const cancelRequest = require("./cancelRequest");

const router = new Router();

router.get("/hello", (ctx) => {
  ctx.body = "hello";
});

router.use("/auth", auth.routes());
router.use("/posts", posts.routes());
router.use("/admins", admins.routes());
router.use("/banners", banners.routes());
router.use("/bulletins", bulletins.routes());
router.use("/cancelRequest", cancelRequest.routes());

module.exports = router;
