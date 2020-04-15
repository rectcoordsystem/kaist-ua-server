const Router = require("koa-router");

const posts = require("./posts");
const banners = require("./banners");

const router = new Router();

router.use("/posts", posts.routes());
router.use("/banners", banners.routes());

module.exports = router;
