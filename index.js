const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-body");

const router = require("./routes");

const PORT = 8080;

//app.use(bodyParser);
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
