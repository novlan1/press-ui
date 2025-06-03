// 不能额外依赖其他包，要干净。因为会注入到globalVar中，不能循环依赖
/**
 * 刷新当前页面
 *
 * @param [isRedirect=false]
 */
export function refreshCurrentPage(isRedirect = false) {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  if (!currentPage) {
    return;
  }

  if (currentPage && (currentPage).$page?.fullPath) {
    const { fullPath } = (currentPage).$page;
    const url = fullPath;


    if (isRedirect) {
      uni.redirectTo({
        url,
      });
      return;
    }

    uni.reLaunch({
      url,
    });
  }
}


export function queryString(options, needEncode = true) {
  const query = Object.keys(options)
    .map(key => `${key}=${needEncode ? encodeURIComponent(options[key] ?? '') : options[key]}`);

  return query.join('&');
}


export function routeChangePath(url, options) {
  if (options) {
    const query = queryString(options, true);
    const symbol = url.includes('?') ? '&' : '?';
    if (query) {
      return `${url}${symbol}${query}`;
    }
  }
  return url;
}


/**
 * 获取当前url
 * @function getCurUrl
 * @return {string}
 */
export function getCurUrl() {
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  if (!page) return '';
  const { fullPath } = (page).$page;
  if (fullPath) {
    return fullPath;
  }
  return `${routeChangePath(page.route, (page).options)}`;
}
