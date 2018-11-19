'use strict';

module.exports = () => {
  return async function(ctx, next) {
    // const token = ctx.session.token;
    // console.log('token:' + token);
    // const res = await ctx.service.auth.checkToken(token);
    // console.log(res.data);
    // if (res.data.IsAuthenticated === 0) {
    //   ctx.redirect(res.data.LoginUrl + '?appid=' + ctx.app.config.appid);
    //   // ctx.body = { id: res.id };
    //   // ctx.status = 401;
    // }

    await next();
  };
};
