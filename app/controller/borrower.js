'use strict';

const Controller = require('./base');

class BorrowerController extends Controller {
  async index() {
    const query = this.ctx.query;
    const fields = await this.ctx.service.borrower.getCustomerDisplayField(query.memberType, query.userId);
    query.pageIndex = query.pageIndex || 1;

    const custom = await this.ctx.service.borrower.getCustomerList(query);
    const data = { fields, custom };
    this.success(data);
  }

  async baseInfo() {
    const req = this.ctx.request.query;
    const res = await this.ctx.service.borrower.getCustomerSingle(req.custId);
    this.success(res);
  }

  async detailInfo() {
    const req = this.ctx.request.query;
    const res = await this.ctx.service.borrower.getCustomerDetail(req.custId);
    this.success(res);
  }

  async companyInfo() {
    const req = this.ctx.request.query;
    const res = await this.ctx.service.borrower.getCompanyInfo(req.custId);
    this.success(res);
  }

  async certifiedInfo() {
    const req = this.ctx.request.query;
    const res = await this.ctx.service.borrower.getCertifiedInfo(req.custId);
    this.success(res);
  }

  async modifyPhone() {
    const req = this.ctx.request.body;
    const res = await this.ctx.service.borrower.modifyPhone(req);
    this.success(res);
  }

  async modifyId() {
    const req = this.ctx.request.body;
    const res = await this.ctx.service.borrower.modifyId(req);
    this.success(res);
  }

  async modifyCompany() {
    const req = this.ctx.request.body;
    console.log(req);
    const res = await this.ctx.service.borrower.modifyCompany(req.params);
    this.success(res);
  }
}

module.exports = BorrowerController;
