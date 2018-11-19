'use strict';

const Service = require('egg').Service;

class AuthService extends Service {
  async checkToken(token) {
    const option = {
      method: 'post',
      dataType: 'json',
      data: { appid: this.config.appid, token, _accept: 'json' },
    };

    return await this.ctx.curl(this.config.esbDomain + '/api/CheckToken', option);
  }

  async getMenu(userid) {
    const option = {
      method: 'post',
      dataType: 'json',
      data: { appid: this.config.appid, userid, _accept: 'json' },
    };

    return await this.ctx.curl(this.config.esbDomain + '/api/GetModuleList', option);
  }
}

module.exports = AuthService;
