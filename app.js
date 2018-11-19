'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    // app.cities = await app.curl('http://example.com/city.json', {
    //   method: 'GET',
    //   dataType: 'json',
    // });

    // 也可以通过以下方式来调用 Service
    // const ctx = app.createAnonymousContext();
    // const res = await ctx.service.auth.getDate();
    //
    // console.log('request api datetime:' + res.date);
  });


  /*app.sessionStore = {
    async get(key) {
      const res = await app.redis.get(key);
      if (!res) return null;
      return JSON.parse(res);
    },

    async set(key, value, maxAge) {
      // maxAge not present means session cookies
      // we can't exactly know the maxAge and just set an appropriate value like one day
      if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
      value = JSON.stringify(value);
      await app.redis.set(key, value, 'PX', maxAge);
    },

    async destroy(key) {
      await app.redis.del(key);
    },
  };*/

  app.httpclient.on('response', result => {
    // console.log(JSON.stringify(result.res));
  });

  app.httpclient.on('request', result => {
    // console.log(result);
  });
};
