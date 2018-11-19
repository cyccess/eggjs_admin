'use strict';

const Service = require('egg').Service;

class BorrowerService extends Service {
  async getCustomerList(query) {
    query.pageSize = 10;
    const option = {
      method: 'get',
      dataType: 'json',
      data: query,
    };

    const res = await this.ctx.curl(`${this.config.apiUrl}/api/loancustomer/list/${query.userId}`, option);
    if (res.data.status === 100) {
      return JSON.parse(res.data.jsonData);
    }
    return null;
  }

  async getCustomerDisplayField(type, userId) {
    let memberType = 'PERSONAL';
    if (type === 5) {
      memberType = 'COMPANY';
    }

    const res = await this.ctx.curl(`${this.config.apiUrl}/api/field/header/list`, {
      method: 'get',
      dataType: 'json',
      data: {
        userId,
        memberType,
        userType: 'LOANS',
      },
    });
    if (res.data.status === 100) {
      return JSON.parse(res.data.jsonData);
    }
    return null;
  }

  async getCustomerSingle(custId) {
    const option = {
      method: 'get',
      dataType: 'json',
      data: {
        custId,
      },
    };
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/loancustomer/query`, option);
    if (res.data.status === 100) {
      return JSON.parse(res.data.jsonData);
    }
    return null;
  }

  async getCustomerDetail(custId) {
    const option = {
      method: 'get',
      dataType: 'json',
      data: {
        custId,
      },
    };
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/loancustomer/custinfo/query`, option);
    if (res.data.status === 100) {
      return JSON.parse(res.data.jsonData);
    }
    return null;
  }

  async getCompanyInfo(custId) {
    const option = {
      method: 'get',
      dataType: 'json',
      data: {
        custId,
      },
    };
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/loancustomer/company/query`, option);
    if (res.data.status === 100) {
      return JSON.parse(res.data.jsonData);
    }
    return null;
  }

  async getCertifiedInfo(custId) {
    const option = {
      method: 'get',
      dataType: 'json',
      data: {
        custId,
      },
    };
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/loancustomer/certified/query`, option);
    if (res.data.status === 100) {
      return JSON.parse(res.data.jsonData);
    }
    return null;
  }

  async modifyPhone(params) {
    const option = {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify({
        id: params.id,
        phone: params.phone,
      }),
    };
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/loancustomer/update?userId=${params.userId}`, option);
    // console.log(res);
    if (res.data.status === 100) {
      return res.data;
    }
    return null;
  }

  async modifyId(params) {
    const option = {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: JSON.stringify({
        id: params.id,
        ic: params.ic,
      }),
    };
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/loancustomer/certified/update?userId=${params.userId}`, option);
    // console.log(res);
    if (res.data.status === 100) {
      return res.data;
    }
    return null;
  }

  async modifyCompany(params) {
    if (params) {
      params = JSON.parse(params);
    }
    const option = {
      method: 'PUT',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      data: `{"id":${params.id},"${params.fieldName}":"${params.val}"}`,
    };
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/loancustomer/company/update?userId=${params.userId}`, option);
    // console.log(res);
    if (res.data.status === 100) {
      return res.data;
    }
    return null;
  }
}

module.exports = BorrowerService;
