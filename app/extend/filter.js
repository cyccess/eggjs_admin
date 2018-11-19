'use strict';
exports.hello = name => `hi, ${name}`;

const pager = require('./pagination');
const dateFilter = require('nunjucks-date-filter');

exports.paging = (model, originalUrl) => {
  const page = model.page || model.pageNum;
  const pageSize = model.pageSize;
  const totalCount = model.totalCount || model.total;

  return pager(page, pageSize, totalCount, originalUrl);
};

exports.memberType = type => {
  type = Number(type);
  if (type === 1) { return '个人'; }
  if (type === 5) { return '企业'; }
};

exports.date = dateFilter;
