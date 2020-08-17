const Router = require("koa-router");
const router = new Router();
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    // API informations (required)
    title: "KAIST UA Web", // Title (required)
    version: "0.1.0", // Version (required)
    description: "API for student.kaist.ac.kr/web", // Description (optional)
  },
};

// 프로덕션에는 모든 api를 공개하지않습니다.
const apis = ["./src/routes/*/*.ctrl.js"];

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis,
};

const swaggerDoc = swaggerJSDoc(options);

router.get("/", async (ctx) => {
  ctx.redirect("/swagger");
});

router.get("/swagger.json", async (ctx) => {
  ctx.response.body = await swaggerDoc;
});

module.exports = router;
