const Router = require("koa-router");

const posts = require("./posts");
const banners = require("./banners");
const bulletins = require("./bulletins");

const router = new Router();

router.use("/posts", posts.routes());
router.use("/banners", banners.routes());
router.use("/bulletins", bulletins.routes());

module.exports = router;
