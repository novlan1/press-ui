export function getRouteQuery() {
  const pages = getCurrentPages();
  const page = pages[pages.length - 1];
  if (!page) {
    return {};
  }
  return page.options || {};
}


export const $route = Object.defineProperties({}, {
  query: {
    get() {
      const result = getRouteQuery() || {};

      return Object.keys(result).reduce((acc, item) => {
        const newVal = decodeURIComponent(result[item]);

        return {
          ...acc,
          [item]: newVal,
        };
      }, {});
    },
  },
  params: {
    get() {
      return getRouteQuery();
    },
  },
});


export function findRouteByName(routes, name) {
  return routes.find(item => item.name === name);
}


export function genQueryToStr(query = {}) {
  return Object.keys(query).map((key) => {
    const value = query[key];
    return `${key}=${value}`;
  })
    .join('&');
}


function genFullPath(path, query = {}, params = {}) {
  return `${path}?${genQueryToStr(query)}&${genQueryToStr(params)}`;
}


function routerPushOrReplace(ALL_ROUTES, args, isPush = true) {
  if (typeof args === 'object') {
    const { name, query, params } = args;
    if (name) {
      const found = findRouteByName(ALL_ROUTES, name);
      if (!found) {
        console.warn(`没找到 ${name} 的路由`);
        return;
      }

      const url = genFullPath(found.path, query, params);

      if (isPush) {
        uni.navigateTo({ url });
      } else {
        uni.redirectTo({ url });
      }
    }
  }
}

export const getRouter = ALL_ROUTES => ({
  push(args) {
    routerPushOrReplace(ALL_ROUTES, args, true);
  },
  replace(args) {
    routerPushOrReplace(ALL_ROUTES, args, false);
  },
});
