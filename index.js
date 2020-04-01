const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-body");

const admin = require("./routes/admin");

const PORT = 8080;

app.use(bodyParser);
app.use(admin.routes());

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
