require("dotenv").config();
const Koa = require("koa");
const bodyParser = require("koa-body");
const cors = require("@koa/cors");
const logger = require("koa-logger");
const router = require("./src/routes");
const models = require("./src/database/models/index.js");
const helmet = require("koa-helmet");
const passport = require("koa-passport");

const run = async () => {
  const app = new Koa();

  models.sequelize
    .sync()
    .then(() => {
      console.log(" DB 연결 성공");
    })
    .catch((err) => {
      console.log("연결 실패");
      console.log(err);
    });

  app.use(cors());
  app.use(helmet());
  app.use(passport.initialize());
  require("./src/config/accesstoken-strategy.js");
  app.use(logger());
  app.use(bodyParser());
  app.use(router.routes()).use(router.allowedMethods());

  const PORT = 8080;

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

run();
