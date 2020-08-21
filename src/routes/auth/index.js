const Router = require('koa-router');
const auth = new Router();
const authCtrl = require('./auth.ctrl');

auth.post('/login', authCtrl.login);

module.exports = auth;
