'use strict';

const Service = require('egg').Service;

class CustomerService extends Service {
  async getCustomerList(query) {
    const option = {
      method: 'get',
      dataType: 'json',
      data: query,
    };

    console.log(query)

    const res = await this.ctx.curl(`${this.config.apiUrl}/api/customer/list/${query.userId}`, option);
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
        userType: 'INVESTORS',
      },
    });

    // console.log(res);
    if (res.data.status === 100) {
      const data = JSON.parse(res.data.jsonData);
      // type = type || 0;
      // type = parseInt(type);
      // if (type === 1) {
      //   data = data.filter(item => item.memberType === 0 || item.memberType === 1);
      // }
      // if (type === 5) {
      //   data = data.filter(item => item.memberType === 0 || item.memberType === 5);
      // }
      return data;
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
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/customer/query`, option);
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
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/customer/custinfo/query`, option);
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
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/customer/company/query`, option);
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
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/customer/certified/query`, option);
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
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/customer/update?userId=${params.userId}`, option);
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
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/customer/certified/update?userId=${params.userId}`, option);
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
    const res = await this.ctx.curl(`${this.config.apiUrl}/api/customer/company/update?userId=${params.userId}`, option);
    // console.log(res);
    if (res.data.status === 100) {
      return res.data;
    }
    return null;
  }
}

module.exports = CustomerService;
