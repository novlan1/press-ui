import type { IRoute, IMeta } from './types';
export declare function getQueryBaseStr(str?: string): Record<string, any>;
export declare function isMatchPath(meta: IMeta, path: string): {
  match: RegExpMatchArray;
  regexp: RegExp;
  keys: any[];
} | undefined;
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
export declare function findRouteName(path: string, routes: Array<IRoute>): {
  name: string | undefined;
  params: {
    [x: string]: any;
  };
  path: string | undefined;
  meta: IMeta;
} | undefined;
