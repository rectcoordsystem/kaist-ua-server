const Router = require('koa-router');
const payment = new Router();
const passport = require('koa-passport');
const paymentCtrl = require('./payment.ctrl');

payment.post(
    '/',
    passport.authenticate('token', { session: false }),
    paymentCtrl.add,
);
payment.get('/', paymentCtrl.list);
payment.delete(
    '/:id',
    passport.authenticate('token', { session: false }),
    paymentCtrl.remove,
);

module.exports = payment;
