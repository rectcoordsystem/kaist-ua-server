const Router = require("koa-router");
const models = require("../database/models");

const router = new Router();

router.get("/", (ctx) => (ctx.body = "안녕하세요, 최영훈입니다."));
router.get("/deploy", (ctx) => (ctx.body = "무중단배포 성공"));

router.get("/banners", async (ctx) => {
  await models.Banners.findAll()
    .then((banners) => {
      ctx.body = banners;
    })
    .catch((err) => {
      ctx.body = `error: ${err}`;
    });
});

module.exports = router;
