let bannerId = 1;
const banners = [];

/**
 * POST /banners
 * {url}
 */
exports.upload = (ctx) => {
  const { utl } = ctx.request.url;
  const banner = {
    id: bannerId,
    url: url,
  };
  bannerId += 1;
  banners.push(banner);
  ctx.body = banner;
};

/**
 *  GET /banners
 */

exports.list = (ctx) => {
  ctx.body = banners;
};

/**
 * DELETE /banners/:id
 */

exports.remove = (ctx) => {
  const { id } = ctx.params;
  const index = banners.findIndex((banner) => banner.id.toString === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: "포스트가 존재하지 않습니다.",
    };
    return;
  }
  banners.splice(index, 1);
  ctx.status = 204;
};
