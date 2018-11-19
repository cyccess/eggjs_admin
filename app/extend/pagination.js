'use strict';

module.exports = (page, pageSize, totalCount, originalUrl) => {
  let pagingString = '';

  if (totalCount <= pageSize) return pagingString;

  let totalPage = Math.floor(totalCount / pageSize);
  if (totalCount % pageSize > 0) {
    totalPage += 1;
  }
  originalUrl = originalUrl.replace(/&page=/g, '&');
  originalUrl = originalUrl.replace(/\?page=/g, '?');
  let newUrl = '';
  const s1 = originalUrl.split('?');
  if (s1.length > 0) {
    for (let i = 1; i < s1.length; i++) {
      const s2 = s1[i].split('&');
      for (let j = 0; j < s2.length; j++) {
        if (s2[j].indexOf('=') > 0) {
          newUrl += '&' + s2[j];
        }
      }
    }
  }
  if (newUrl.length > 0) {
    newUrl = newUrl.substring(1);
    newUrl = s1[0] + '?' + newUrl + '&';
  } else {
    newUrl = s1[0] + '?';
  }
  pagingString = '<ul class="pagination">';
  if (page === 1) {
    pagingString += '<li class="page-item disabled"><a class="page-link" href="#">&laquo;</a></li>';
  } else {
    pagingString += `<li class="page-item"><a class="page-link" href="${newUrl}page=${(page - 1)}">&laquo;</a></li>`;
  }
  for (let i = 1; i <= totalPage; i++) {
    if (i === page) {
      pagingString += '<li class="page-item active"><a class="page-link" href="#">' + i + '</a></li>';
    } else {
      if ((i <= page + 2 && i >= page - 2) || i <= 2 || i >= totalPage - 1) {
        pagingString += '<li class="page-item"><a class="page-link" href="' + newUrl + 'page=' + i + '">' + i + '</a></li>';
      } else if (i === page + 3 || i === page - 3) {
        pagingString += '<li class="page-item"><a class="page-link" href="#">...</a></li>';
      }
    }
  }
  if (page === totalPage) {
    pagingString += '<li class="page-item disabled"><a class="page-link" href="#">&raquo;</a></li>';
  } else {
    pagingString += '<li class="page-item"><a class="page-link" href="' + newUrl + 'page=' + (page + 1) + '">&raquo;</a></li>';
  }

  return pagingString;
};

