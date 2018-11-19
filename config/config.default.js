'use strict';
// const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  config.appid = 'e4ccdb6a-4e8d-4c62-aa01-97f6479b2410';

  config.esbDomain = 'http://esb.ddxlong.net';

  config.apiUrl = 'http://192.168.1.8:9198';
  // config.apiUrl = 'http://172.10.2.220:9198';
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532419885288_9332';

  // add your config here
  config.middleware = [
    'auth',
  ];

  config.auth = {
    ignore: [ '/login', '/api/logout' ],
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
    // mapping: {
    //   '.html': 'nunjucks',
    // },
    // root: [
    //     path.join(appInfo.baseDir, 'app/view'),
    //     path.join(appInfo.baseDir, 'path/to/another'),
    // ].join(',')
  };

  config.session = {
    key: 'EGG_SESS',
    maxAge: 3600 * 1000,
    httpOnly: true,
    encrypt: true,
  };

  config.redis = {
    client: {
      host: '192.168.1.9',
      port: 6379,
      timeout: 0,
      password: null,
      log_connect: true,
      db: 0,
    },
  };

  config.security = {
    csrf: false,
    // csrf: {
    //   ignore: '/api',
    // },
  };

  return config;
};
