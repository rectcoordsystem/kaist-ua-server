const Router = require('koa-router');
const posts = new Router();
const postsCtrl = require('./posts.ctrl');

const printInfo = (ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

posts.post('/', postsCtrl.write);
posts.get('/', postsCtrl.list);
posts.get('/:id', postsCtrl.read);
posts.patch('/:id', postsCtrl.update);
posts.delete('/:id', postsCtrl.remove);

module.exports = posts;
