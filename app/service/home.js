'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getDate() {
    const res = await this.ctx.curl('http://192.168.1.8:9198/api/user/getDate', { method: 'get' });
    const data = JSON.parse(res.data);
    this.logger.info(data.date);

    return data;
  }
}

module.exports = HomeService;
