import { deepAssign } from '../common/utils/object-assign';
// #ifndef VUE3
import { Vue } from '../common/vue3/vue';
// #endif

import defaultLang from './lang/zh-CN';

let lang = defaultLang;
let merged = false;


let i18nHandler = function () {
  // #ifndef VUE3
  const vuei18n = Object.getPrototypeOf(this || Vue)?.$t;
  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(
        Vue.config.lang,
        deepAssign(Vue?.locale?.(Vue.config.lang) || {}, lang),
      );
    }
    return vuei18n.apply(this, arguments);
  }
  // #endif

  return;
};

export const t = function (path = '', ...options) {
  let value = i18nHandler.apply(this);
  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];

    if (i === j - 1) {
      // 如果没有找到value，就从第一层找
      if (!value) {
        return lang[property] || '';
      }
      if (typeof value === 'function') {
        return value(...options);
      }
      return value;
      // return format(value, options);
    }
    if (!value) {
      return lang[array[array.length - 1]] || '';
    }
    current = value;
  }
  return '';
};

export const use = function (l) {
  lang = l || lang;
};

export const i18n = function (fn) {
  i18nHandler = fn || i18nHandler;
};

export const add = function (messages = {}) {
  deepAssign(lang, messages);
};

export const getLang = function () {
  return lang;
};

export default {
  use,
  t,
  i18n,
  add,
  getLang,
};
