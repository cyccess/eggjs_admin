'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');
const readFilePromise = util.promisify(fs.readFile);

const Controller = require('./base');

class HomeController extends Controller {

  async index1() {
    const { ctx } = this;
    ctx.response.type = 'html';
    const page = await readFilePromise(path.resolve(__dirname, '../public/dist/index.html'));
    ctx.body = page;
  }

   async index() {
    // const temp = this.config.baseDir;
    // const data = await this.ctx.service.home.getDate();
    // this.ctx.session.name = 'cyccess';

    // console.log(this.ctx.session.name);

    // const { app } = this;

    // await app.redis.set('foo', 'bar');
    // get
    // const val = await app.redis.get('foo');

    // await app.redis.del('foo');

    // const id = this.ctx.query.id;
    // const test = this.ctx.helper.lowercaseFirst('abc');

    // console.log(test);
     console.log('home')
    await this.ctx.render('home/index', { msg: 'Current Datetime:', title: '控制台' });
  }
  // token登录
  async tokenlogin() {
    const token = this.ctx.query.token || '';
    this.ctx.session.token = token;
    const user = await this.ctx.service.auth.checkToken(token);
    console.log(user.data);
    this.ctx.session.userId = user.data.UserId;
    this.ctx.session.user = user.data;
    this.ctx.cookies.set('token', token);

    if (user.data.IsAuthenticated === 1) {
      // const res = await this.ctx.service.auth.getMenu(user.data.UserId);
      // this.ctx.session.menu = res.data;
    }
    this.ctx.redirect('/');
    // console.log('token:' + token);
    // this.ctx.cookies.set('token', token, { httpOnly: false });
    // this.ctx.redirect('/#/login?token=' + token);
    // 本地开发模式启用
    //this.ctx.redirect('http://localhost:8080/#/login?token=' + token);
  }

  async getInfo() {
    const token = this.ctx.request.body.token;
    const res = await this.ctx.service.auth.checkToken(token);
    this.success(res.data);
  }

  async getModules() {
    const userId = this.ctx.request.body.userId;
    const res = await this.ctx.service.auth.getMenu(userId);
    this.success(res.data);
  }

  async logout() {
    this.ctx.session = null;
    this.success({ msg: 'OK' });
    // this.ctx.redirect('/');
  }
}

module.exports = HomeController;
