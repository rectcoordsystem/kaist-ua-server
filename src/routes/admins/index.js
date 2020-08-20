const Router = require('koa-router');
const admins = new Router();
const adminsCtrl = require('./admins.ctrl');

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

admins.post('/login', adminsCtrl.login);
admins.get('/check', adminsCtrl.check);
admins.post('/register', adminsCtrl.register);

module.exports = admins;
