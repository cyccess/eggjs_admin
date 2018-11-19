'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/login', controller.home.tokenlogin);
  router.get('/logout', controller.home.logout);

  router.get('/customer/list', controller.customer.index);
  router.post('/customer/baseInfo', controller.customer.baseInfo);

  router.post('/api/getInfo', controller.home.getInfo);
  router.post('/api/getModules', controller.home.getModules);
  router.post('/api/logout', controller.home.logout);

  router.get('/api/customer/list', controller.customer.index);
  router.get('/api/customer/baseInfo', controller.customer.baseInfo);
  router.get('/api/customer/detailInfo', controller.customer.detailInfo);
  router.get('/api/customer/companyInfo', controller.customer.companyInfo);
  router.get('/api/customer/certifiedInfo', controller.customer.certifiedInfo);
  router.put('/api/customer/modifyPhone', controller.customer.modifyPhone);
  router.put('/api/customer/modifyId', controller.customer.modifyId);
  router.put('/api/customer/modifyCompany', controller.customer.modifyCompany);

  router.get('/api/borrower/list', controller.borrower.index);
  router.get('/api/borrower/baseInfo', controller.borrower.baseInfo);
  router.get('/api/borrower/detailInfo', controller.borrower.detailInfo);
  router.get('/api/borrower/companyInfo', controller.borrower.companyInfo);
  router.get('/api/borrower/certifiedInfo', controller.borrower.certifiedInfo);
  router.put('/api/borrower/modifyPhone', controller.borrower.modifyPhone);
  router.put('/api/borrower/modifyId', controller.borrower.modifyId);
  router.put('/api/borrower/modifyCompany', controller.borrower.modifyCompany);

  // router.resources('posts', '/api/posts', controller.posts);
  // router.resources('customers', '/api/customers', controller.customers);
  // router.resources('modules', '/api/modules', controller.modules);
};
