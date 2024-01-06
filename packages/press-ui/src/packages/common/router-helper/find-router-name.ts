import pathToRegexp from './path-to-regexp';

import type { IRoute, IMeta } from './types';

export function getQueryBaseStr(str = '') {
  if (!str) {
    return {};
  }
  return str.split('&').reduce((acc: Record<string, any>, item: string) => {
    const list = item.split('=');
    acc[list[0]] = list[1];
    return acc;
  }, {});
}

export function isMatchPath(meta: IMeta, path: string) {
  const { rawPath = [] } = meta;
  if (!rawPath?.length) return;

  for (const item of rawPath) {
    // eslint-disable-next-line prefer-const
    let keys: Array<any> = [];
    const regexp = pathToRegexp(item, keys);
    const match = path.match(regexp);

    if (match) {
      return {
        match,
        regexp,
        keys,
      };
    }
  }

  return;
}

/**
 * 根据路由表，找到 path 对应的 路由名称
 * @param {string} path 路由路径
 * @param {array} routes 路由表
 * @returns {object} 匹配到的路由信息
 *
 * @example
 * ```ts
 * const { name, params, meta, path } = findRouteName(rawPath, ALL_ROUTES) || {};
 *
 * console.log('name', name);
 * ```
 */
export function findRouteName(path: string, routes: Array<IRoute>) {
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0;i < routes.length;i++) {
    const item = routes[i];
    const { name, meta = {}, path: itemPath } = item;

    let purePath = path;
    let queryStr = '';
    if (path.includes('?')) {
      const idx = path.indexOf('?');
      purePath = path.slice(0, idx);
      queryStr = path.slice(idx + 1);
    }

    const match = isMatchPath(meta, purePath);

    const queryBasePath = getQueryBaseStr(queryStr);
    if (match) {
      const { match: iMatch, keys } = match;

      const params = keys.reduce((acc: {[k: string]: string}, key, index) => {
        const { name } = key;
        acc[name] =  iMatch[index + 1];
        return acc;
      }, {});


      return {
        name,
        params: {
          ...params,
          ...queryBasePath,
        },
        path: itemPath,
        meta,
      };
    }
  }
}
