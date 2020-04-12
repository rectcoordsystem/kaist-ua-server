const Koa = require("koa");
const bodyParser = require("koa-body");
const cors = require("@koa/cors");
const logger = require("koa-logger");
const router = require("./src/routes");
const models = require("./src/database/models/index.js");

const run = async () => {
  const app = new Koa();
  const corsOptions = {
    origin: "http://localhost:3000", // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  };

  models.sequelize
    .sync()
    .then(() => {
      console.log(" DB 연결 성공");
    })
    .catch((err) => {
      console.log("연결 실패");
      console.log(err);
    });

  app.use(cors(corsOptions));
  app.use(logger());
  app.use(bodyParser());
  app.use(router.routes());

  const PORT = 8080;

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

run();
