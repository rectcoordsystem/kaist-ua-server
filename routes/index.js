const Router = require("koa-router");

const router = new Router();

router.get("/", ctx => (ctx.body = "안녕하세요, 최영훈입니다."));
router.get("/deploy", ctx => (ctx.body = "무중단배포 성공"));

module.exports = router;
